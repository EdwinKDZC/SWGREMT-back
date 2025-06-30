// controllers/ordenCompraController.js
import OrdenCompra from '../models/ordencompra.js';
import Product from '../models/product.model.js';

// Crear orden de compra
export const createOrdenCompra = async (req, res) => {
  try {
    const orden = new OrdenCompra(req.body);
    await orden.save();
    res.status(201).json(orden);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear orden de compra' });
  }
};

// Obtener todas las órdenes
export const getOrdenesCompra = async (req, res) => {
  try {
    const ordenes = await OrdenCompra.find().sort({ createdAt: -1 });
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las órdenes de compra' });
  }
};

export const getOrdenCompraByPage = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const ordenes = await OrdenCompra.find()
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .exec();
    const total = await OrdenCompra.countDocuments();
    res.status(200).json({
      ordenes,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las órdenes de compra' });
  }
}

// Cambiar estado de pago
export const updateEstadoPago = async (req, res) => {
  try {
    const { idOrdenCompra } = req.params;
    const { estadoPago } = req.body;

    const updated = await OrdenCompra.findByIdAndUpdate(
      idOrdenCompra,
      { estadoPago },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado de pago' });
  }
};

// Cambiar estado de orden y actualizar stock
export const updateEstadoOrden = async (req, res) => {
  try {
    const { idOrdenCompra } = req.params;
    const { estadoOrden } = req.body;

    const orden = await OrdenCompra.findById(idOrdenCompra);
    if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });

    if (estadoOrden === 'Conforme') {
      for (const item of orden.productos) {
        const product = await Product.findOne({
          brand: item.marca,
          model: item.modelo,
        });

        if (product) {
          if (!product.stock) product.stock = 0;
          product.stock += item.cantidad || 0;
          await product.save();
        }
      }
    }

    orden.estadoOrden = estadoOrden;
    await orden.save();

    res.status(200).json(orden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el estado de la orden' });
  }
};
