import express from "express";
import connectDB from "../config/db.js";
import dotenv from "dotenv";

const app = express();
connectDB();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});