import express from "express";
import {
    createCotizarProducto, getCotizarProductos
} from "../controllers/cotizarProducto.controller.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/createCotizarProducto", createCotizarProducto);
router.get("/getCotizarProductos",  getCotizarProductos);


export default router;
