import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  ruc: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  url_file: {
    type:String,
    required: true,
  },


});

const SupplierModel = mongoose.model('Supplier', supplierSchema);

export default SupplierModel;
