import express from "express";
import { registrarVenta } from "../controllers/venta.controller.js";

const router = express.Router();

router.post("/registrarVenta", registrarVenta);

export default router;
