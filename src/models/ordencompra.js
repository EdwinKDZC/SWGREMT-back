// models/OrdenCompra.js
import mongoose from 'mongoose';

const ordenCompraSchema = new mongoose.Schema({
  cotizacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'CotizarProducto', required: true },
  companyName: { type: String, required: true },
  productos: [
    {
      marca: String,
      modelo: String,
      tipo: String,
      calidad: String,
      precio: Number,
      cantidad: Number,
    },
  ],
  estadoPago: {
    type: String,
    enum: ['Pendiente Pago', 'Pagado'],
    default: 'Pendiente Pago',
  },
  estadoOrden: {
    type: String,
    enum: ['Solicitado', 'Conforme'],
    default: 'Solicitado',
  },
  fechaOrden: {
    type: Date,
    default: () => {
      const now = new Date();
      return new Date(now.getTime() - 5 * 60 * 60 * 1000); // UTC-5
    },
  },
}, {
  timestamps: true,
  versionKey: false,
});

const OrdenCompra = mongoose.model('OrdenCompra', ordenCompraSchema);
export default OrdenCompra;
