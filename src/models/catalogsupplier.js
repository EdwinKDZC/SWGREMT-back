import mongoose, { Schema } from 'mongoose';

const catalogsupplierSchema = new mongoose.Schema({
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
},

  codigo: {
    type: String, 
    required: false,
  },
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
    type:Number,
    required: false,
  },
  fechaGarantia: {
    type:Date,
    required: false,
  },

});

const CatalogSupplierModel = mongoose.model('CatalogSupplier', catalogsupplierSchema);

export default CatalogSupplierModel;
