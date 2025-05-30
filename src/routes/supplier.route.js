import express from "express";
import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    uploadSupplierFile,
    importSuppliers
} from "../controllers/supplier.controller.js";
import upload from "../middleware/multer.js"; // Assuming you have a multer middleware set up

const router = express.Router();

router.post("/createSupplier", createSupplier);
router.get("/getSuppliers", getSuppliers);
router.get("/getSupplierById/:idSupplier", getSupplierById);
router.put("/updateSupplier/:idSupplier", updateSupplier);
router.delete("/deleteSupplier/:idSupplier", deleteSupplier);
router.post('/uploadSupplierFile', upload.single('file'), uploadSupplierFile);
router.post('/importSuppliers', upload.single('file'), importSuppliers);

export default router;
