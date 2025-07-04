import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export const createPaymentPreference = async (orderData) => {
    try {
        // const payment = await MercadoPago.payment.create();
        // crear preferencia de pago
        const preference = new Preference(client);
        const response = await preference.create({
            body: {
                items: orderData.items.map((item) => ({
                    id: item.productId.toString(),
                    title: item.brand + " " + item.model,
                    description: item.description,
                    category_id: item.category,
                    quantity: item.quantity,
                    unit_price: item.priceSold,
                })),
                payer: {
                    name: orderData.payer.firstName,
                    surname: orderData.payer.lastName,
                    email: orderData.payer.email,
                    identification: {
                        type: orderData.payer.identificationType,
                        number: orderData.payer.identificationNumber,
                    },
                    phone: {
                        number: orderData.payer.phoneNumber,
                    },
                    address: {
                        street_name: orderData.payer.addressStreetName,
                    }
                },
                external_reference: orderData._id.toString(),
                // notification_url: orderData.notification_url,
                back_urls: {
                    success: `${process.env.FRONTEND_URL}/confirmation`,
                    failure: `${process.env.FRONTEND_URL}/failure`,
                    pending: `${process.env.FRONTEND_URL}/pending`,
                },
                auto_return: "approved",
            },
        });

        // console.log("Payment preference created:", response);

        return response;
    } catch (error) {
        console.error("Error creating payment:", error);
        throw error;
    }
};
