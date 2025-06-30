import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    tipo: { type: String, enum: ["Boleta", "Factura"] },
    numero: { type: String },
    productos: [
      {
        codigo: String,
        brand: String,
        model: String,
        category: String,
        quality: String,
        cantidad: Number,
        precio: Number,
      },
    ],
    total: { type: Number},
  },
  { timestamps: true }
);

export default mongoose.model("Venta", ventaSchema);
