import express from "express";
import { createOrder, verifyPayment } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/createOrder", createOrder);
// router.get('/getOrderById/:id', getOrderById);
router.get("/verifyPayment/:paymentId", verifyPayment);

export default router;
