import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    tipo: { type: String, enum: ["Boleta", "Factura"] },
    numero: { type: String },
    productos: [
      {
        // _id: false,
        // productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        codigo: String,
        brand: String,
        model: String,
        category: String,
        quality: String,
        cantidad: Number,
        precio: Number,
        // subtotal: Number,
      },
    ],
    total: { type: Number},
    // fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Venta", ventaSchema);
