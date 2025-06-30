import express from "express";
import {
    registrarVenta,
    getVentasByPage,
    getVentaById
} from "../controllers/venta.controller.js";

const router = express.Router();

router.post("/registrarVenta", registrarVenta);
router.get("/getVentasByPage", getVentasByPage);
router.get("/getVentaById/:id", getVentaById);

export default router;
