import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import productRoute from './routes/product.route.js';
import categoryRoute from './routes/category.route.js';

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});