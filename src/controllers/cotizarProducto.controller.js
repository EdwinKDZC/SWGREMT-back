import CotizarProductoModel from "../models/cotizarProducto.js";

const createCotizarProducto = async (req, res) => {
    try {
        const cotizarProducto = new CotizarProductoModel(req.body);
        await cotizarProducto.save();
        res.status(201).json(cotizarProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCotizarProductos = async (req, res) => {
    try {
        const cotizarProductos = await CotizarProductoModel.find();
        res.status(200).json(cotizarProductos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCotizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const cotizarProducto = await CotizarProductoModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!cotizarProducto) {
            return res.status(404).json({ message: "CotizarProducto not found" });
        }
        res.status(200).json(cotizarProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCotizarProductosByPage = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const cotizarProductos = await CotizarProductoModel.find()
            .skip((page - 1) * limit)
            .limit(limit * 1)
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .exec();
        const total = await CotizarProductoModel.countDocuments();
        res.status(200).json({
            cotizarProductos,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createCotizarProducto, getCotizarProductos, updateCotizarProducto, getCotizarProductosByPage };