import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import categoryRoute from "./routes/category.route.js";
import productRoute from "./routes/product.route.js";

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));

app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
