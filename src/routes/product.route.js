import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";
import uploadImage from "../middleware/uploadImage.js";


const router = express.Router();

router.post("/createProduct", uploadImage.single("image") ,createProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/:idProduct", getProductById);
router.put("/updateProduct/:idProduct", uploadImage.single('image'),updateProduct);
router.delete("/deleteProduct/:idProduct", deleteProduct);

export default router;
