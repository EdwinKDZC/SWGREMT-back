import Venta from "../models/venta.model.js";

const registrarVenta = async (req, res) => {
  try {
    const venta = new Venta(req.body);
    await venta.save();
    res.status(201).json({ message: "Venta registrada", venta });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar venta", error });
  }
};

export { registrarVenta };