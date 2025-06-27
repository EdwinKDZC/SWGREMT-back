import express from "express";
import {
    createCotizarProducto, getCotizarProductos, getCotizarProductosByPage, updateCotizarProducto
} from "../controllers/cotizarProducto.controller.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/createCotizarProducto", createCotizarProducto);
router.get("/getCotizarProductos",  getCotizarProductos);
router.put("/updateCotizarProducto/:id", updateCotizarProducto);
router.get("/getCotizarProductosByPage", getCotizarProductosByPage);


export default router;
