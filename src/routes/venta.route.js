import express from "express";
import { registrarVenta,getVentasByPage } from "../controllers/venta.controller.js";

const router = express.Router();

router.post("/registrarVenta", registrarVenta);
router.get("/getVentasByPage", getVentasByPage);

export default router;
