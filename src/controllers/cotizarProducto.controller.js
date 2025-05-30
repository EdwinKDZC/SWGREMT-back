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


export { createCotizarProducto, getCotizarProductos };