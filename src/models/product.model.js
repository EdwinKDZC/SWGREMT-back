import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        brand: { type: String, required: true, trim: true },
        model: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        quality: { type: String, required: true },
    },
    { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
