import mongoose from 'mongoose';

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
    }
  }],

}, {
  timestamps: true,
  versionKey: false,
});

const cotizarProductoModel = mongoose.model('CotizarProducto', cotizarProductoSchema);

export default cotizarProductoModel;
