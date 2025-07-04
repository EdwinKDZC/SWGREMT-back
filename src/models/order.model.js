import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                codigo: {
                    type: String,
                    unique: true,
                    trim: true,
                },
                brand: { type: String, trim: true },
                model: { type: String, trim: true },
                category: { type: String, trim: true },
                description: { type: String, trim: true },
                priceSold: { type: Number, min: 0 },
                stock: { type: Number, default: 0 },
                quantity: { type: Number, min: 1 },
            },
        ],
        payer: {
            firstName: { type: String, trim: true },
            lastName: { type: String, trim: true },
            email: { type: String, trim: true },
            identification: {
                identificationType: {
                    type: String,
                    enum: ["DNI", "RUT", "PASSPORT"],
                },
                identificationNumber: { type: String, trim: true },
            },
            phone: {
                phoneNumber: { type: String, trim: true },
            },
            address: {
                addressStreetName: { type: String, trim: true },
            },
        },
        totalAmount: { type: Number, min: 0 },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
        paymentId: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
