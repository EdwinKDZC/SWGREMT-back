import mongoose from "mongoose";

const boletaSchema = new mongoose.Schema(
    {
        serie: { type: String },
        empresa: { type: String },
        ruc: { type: String },
        direccion: { type: String },
        telefono: { type: String },
        email: { type: String },
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
        total: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model("Boleta", boletaSchema);
