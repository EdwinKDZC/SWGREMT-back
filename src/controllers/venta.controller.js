import generarNumBoleta from "../helpers/generarNumBoleta.js";
import VentasModel from "../models/venta.model.js";
import Venta from "../models/venta.model.js";

const registrarVenta = async (req, res) => {
  try {
    const venta = new Venta(req.body);
    const num = await Venta.countDocuments() + 1; // Auto-increment number based on existing documents
    venta.numero = generarNumBoleta("B", num);
    await venta.save();
    res.status(201).json({ message: "Venta registrada", venta });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar venta", error });
  }
};

const getVentasByPage = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const ventas = await VentasModel.find()
        .skip((page - 1) * limit)
            .limit(limit * 1)
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .exec();
        const total = await VentasModel.countDocuments();
        res.status(200).json({
            ventas,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getVentaById = async (req, res) => {
    try {
        const { id } = req.params;
        const venta = await VentasModel.findById(id);
        if (!venta) {
            return res.status(404).json({ message: 'Venta not found' });
        }
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching venta', error });
    }
};

export { registrarVenta, getVentasByPage, getVentaById };