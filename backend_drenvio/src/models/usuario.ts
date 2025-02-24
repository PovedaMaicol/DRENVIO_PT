import mongoose from "mongoose";

// Definir la interfaz para el documento Usuario
interface Usuario extends Document {
  nombre: string;
  email: string;
  password: string;
  __v: number;
  role: string;
  preciosEspeciales: mongoose.Types.ObjectId[];
}

// Definir el esquema de Usuario
const usuarioSchema = new mongoose.Schema<Usuario>({
  nombre: { type: String, required: true },
  role: { type: String, required: true },
  email: {type: String},
  password: {type: String},
  preciosEspeciales: [{ type: mongoose.Schema.Types.ObjectId, ref: "SpecialPrice" }], // Referencia a SpecialPrice
}, {
    versionKey: false,
    timestamps: true, 
});

// Crear el modelo Usuario
const Usuario = mongoose.model<Usuario>("usuarios", usuarioSchema);

export default Usuario;