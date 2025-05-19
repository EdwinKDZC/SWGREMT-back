import SupplierModel from "../models/supplier.model.js";

const createSupplier = async (req, res) => {
    const supplier = new SupplierModel(req.body);
    try {
        const existingSupplier = await SupplierModel.findOne({
            companyName: supplier.companyName,
        });

        if (existingSupplier) {
            return res.status(400).json({ message: "Supplier already exists" });
        }

        const savedSupplier = await supplier.save();
        res.status(201).json(savedSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await SupplierModel.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSupplierById = async (req, res) => {
    try {
        const supplier = await SupplierModel.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const supplierId = req.params.id;
        const supplier = await SupplierModel.findById(supplierId);

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        supplier.companyName = req.body.companyName || supplier.companyName;
        supplier.ruc = req.body.ruc || supplier.ruc;
        supplier.telefono = req.body.telefono || supplier.telefono;
        supplier.direccion = req.body.direccion || supplier.direccion;
        supplier.email = req.body.email || supplier.email;

        const updatedSupplier = await supplier.save();

        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const {supplierId} = req.params;
        const supplier = await SupplierModel.findById(supplierId);

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        await supplier.deleteOne();
        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};
