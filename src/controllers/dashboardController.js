import OrdenCompra from '../models/ordencompra.js';

export const getTopSelling = async (req, res) => {
  const top = await OrdenCompra.aggregate([
    { $match: { estadoOrden: 'Conforme' } },
    { $unwind: '$productos' },
    { $group: {
        _id: '$productos.modelo',
        totalQty: { $sum: '$productos.cantidad' },
        marca: { $first: '$productos.marca' }
    }},
    { $sort: { totalQty: -1 }},
    { $limit: 5 }
  ]);
  res.json(top);
};

export const getRecentStockAdds = async (req, res) => {
  const recent = await OrdenCompra.find({ estadoOrden: 'Conforme' })
    .sort({ fechaOrden: -1 })
    .limit(5)
    .select('companyName productos fechaOrden');
  res.json(recent);
};

export const getMonthlyEarnings = async (req, res) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const data = await OrdenCompra.aggregate([
    { $match: { fechaOrden: { $gte: start }, estadoOrden: 'Conforme' } },
    { $unwind: '$productos' },
    { $lookup: {
        from: 'products',
        localField: 'productos.modelo',
        foreignField: 'model',
        as: 'prodDetails'
    }},
    { $unwind: '$prodDetails' },
    { $group: {
        _id: null,
        ingresos: { $sum: { $multiply: ['$productos.precio', '$productos.cantidad'] } },
        costoTotal: { $sum: { $multiply: ['$prodDetails.pricePurchase', '$productos.cantidad'] } }
    }},
    { $project: {
        ingresos: 1,
        ganancia: { $subtract: ['$ingresos', '$costoTotal'] }
    }}
  ]);
  res.json(data[0] || { ingresos: 0, ganancia: 0 });
};
