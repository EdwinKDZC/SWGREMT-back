import express from "express";
import {
    createCotizarProducto, getCotizarProductos, updateCotizarProducto
} from "../controllers/cotizarProducto.controller.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/createCotizarProducto", createCotizarProducto);
router.get("/getCotizarProductos",  getCotizarProductos);
router.put("/updateCotizarProducto/:id", updateCotizarProducto);


export default router;
