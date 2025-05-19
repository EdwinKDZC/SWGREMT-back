import express from "express";
import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/createSupplier", createSupplier);
router.get("/getSuppliers", getSuppliers);
router.get("/getSupplierById/:idSupplier", getSupplierById);
router.put("/updateSupplier/:idSupplier", updateSupplier);
router.delete("/deleteSupplier/:idSupplier", deleteSupplier);

export default router;
