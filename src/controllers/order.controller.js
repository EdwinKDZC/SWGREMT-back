import axios from "axios";
import dotenv from "dotenv";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import { createPaymentPreference } from "../service/MercadoPagoService.js";

dotenv.config();

const createOrder = async (req, res) => {
    try {
        const { payer, items } = req.body;

        // Validate request body
        if (!payer || !items) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const totalAmount = items.reduce(
            (acc, item) => acc + item.priceSold * item.quantity,
            0
        );

        // Create new order
        const newOrder = new OrderModel({
            payer,
            items,
            totalAmount,
            status: "pending",
        });

        const preference = await createPaymentPreference(newOrder);

        // Save order to database
        await newOrder.save();

        return res.status(201).json(preference);
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

        const response = await axios.get(
            `https://api.mercadopago.com/v1/payments/${paymentId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log("Payment verification response:", response.data);

        if (!response.data) {
            return res.status(404).json({ msg: "Orden no encontrada" });
        }

        if (response.data.status !== "approved") {
            return res.status(400).json({ msg: "Orden no aprobada" });
        }

        const order = await OrderModel.findById(
            response.data.external_reference
        );

        if (!order) {
            return res
                .status(404)
                .json({ msg: "Orden no encontrada en la base de datos" });
        }

        // Actualiza el estado de la orden
        order.status = "completed";

        await order.save();

        // const updatedStock = order.items.map((item) => ({
        //     productId: item.productId,
        //     stock: item.stock - item.quantity,
        // }));

        // console.log("Updated stock:", updatedStock);

        // const product = await ProductModel.updateMany(
        //     { _id: { $in: updatedStock.map((item) => item.productId) } },
        //     { $inc: { stock: -1 } }
        // );
        // if (!product) {
        //     return res.status(500).json({ msg: "Error updating product stock" });
        // }

        // Actualiza el stock correctamente
        await Promise.all(
            order.items.map(async (item) => {
                await ProductModel.updateOne(
                    { _id: item.productId },
                    { $inc: { stock: -item.quantity } }
                );
            })
        );

        console.log("Product stock updated successfully");

        return res.status(200).json(order);
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { createOrder, verifyPayment };
