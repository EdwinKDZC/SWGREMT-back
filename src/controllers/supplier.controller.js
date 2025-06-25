import SupplierModel from "../models/supplier.model.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
import importExcel from "../helpers/importExcel.js";
import CatalogSupplierModel from "../models/catalogsupplier.js";

dotenv.config();

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        const { supplierId } = req.params;
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

// const uploadSupplierFile = async (req, res) => {
//   try {
//     const filePath = req.file.path;

//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: 'suppliers',
//     });

//     // Eliminar el archivo local
//     fs.unlinkSync(filePath);

//     res.status(200).json({
//       message: 'Archivo subido exitosamente',
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al subir el archivo', error: error.message });
//   }
// };

const uploadSupplierFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Archivo no recibido' });
        }

        res.status(200).json({
            message: 'Archivo subido correctamente',
            file: req.file.filename,
            path: req.file.path
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const importSuppliers = async (req, res) => {
    try {
        const filePath = req.file.path;

        // const { file } = req;
        // console.log("Archivo recibido:", file);
        // const path = file.path.replace(/\/g, "\\");
        const data = await importExcel(filePath);

        const newData = [];
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            newData.push({
                ...row,
                FechaGarantia: new Date((row.FechaGarantia - (25567 + 2)) * 86400 * 1000),
            });
        }
        
        const {supplierId} = req.body
        const supplier = await SupplierModel.findById(supplierId);

        if (!supplier) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }
        
        const formattedData = newData.map(item => ({
            supplierId: supplier._id,
            codigo: item.codigo,
            marca: item.marca,
            modelo: item.modelo,
            tipo: item.tipo,
            calidad: item.calidad,
            precio: item.precio,
            fechaGarantia: typeof item.fechaGarantia === 'number' ? new Date((item.fechaGarantia - 25569) * 86400 * 1000) : new Date(item.FechaGarantia) 
        }));

        await CatalogSupplierModel.insertMany(formattedData);
        
        
        
        console.log("Respuesta", newData);
        fs.unlinkSync(filePath);

        res.status(200).json({ message: 'Proveedores importados exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCatalogSuppliers = async (req, res) => {
    try {
        const { supplierId } = req.params;
        const catalogSuppliers = await CatalogSupplierModel.find({ supplierId }).populate('supplierId', 'companyName');

        if (!catalogSuppliers || catalogSuppliers.length === 0) {
            return res.status(404).json({ message: "No suppliers found for this supplier" });
        }

        res.status(200).json(catalogSuppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    uploadSupplierFile,
    importSuppliers,
    getCatalogSuppliers
};
