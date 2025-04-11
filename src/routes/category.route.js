import express from "express";
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getCategories", getCategories);
router.get("/getCategoryById/:idCategory", getCategoryById);
router.put("/updateCategory/:idCategory", updateCategory);
router.delete("/deleteCategory/:idCategory", deleteCategory);

export default router;
