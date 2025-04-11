import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/:idProduct", getProductById);
router.put("/updateProduct/:idProduct", updateProduct);
router.delete("/deleteProduct/:idProduct", deleteProduct);

export default router;
