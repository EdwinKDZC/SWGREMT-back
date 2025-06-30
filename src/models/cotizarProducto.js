import mongoose from 'mongoose';
import moment from 'moment-timezone';

const cotizarProductoSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: false,
  },
  productos: [{
    marca: {
      type: String,
      required: false,
    },
    modelo: {
      type: String,
      required: false,
    },
    tipo: {
      type: String,
      required: false,
    },
    calidad: {
      type: String,
      required: false,
    },
    precio: {
      type: Number,
      required: false,
    },
    fechaGarantia: {
      type: Date,
      required: false,
    },
    cantidad: {
      type: Number,
      required: false,
    },

  }],
  fechaCotizacion: {
    type: Date,
    default: () => {
    const now = new Date();
    // Ajustamos la hora restando 5 horas (UTC-5, Perú)
    return new Date(now.getTime() - 5 * 60 * 60 * 1000);
  },
  },
  estado: {
    type: String,
    default: 'Pendiente',
  },

}, {
  timestamps: true,
  versionKey: false,
});

const cotizarProductoModel = mongoose.model('CotizarProducto', cotizarProductoSchema);

export default cotizarProductoModel;
