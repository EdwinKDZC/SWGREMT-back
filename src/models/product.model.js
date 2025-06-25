import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        codigo: { type: String, required: true, unique: true, trim: true },
        brand: { type: String, required: true, trim: true },
        model: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        quality: { type: String, required: true },
        pricePurchase: { type: Number, required: true, min: 0 },
        priceSold: { type: Number, required: true, min: 0 },
        image: { type: String },
        stock: { type: Number, default: 0 },


    },
    { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
