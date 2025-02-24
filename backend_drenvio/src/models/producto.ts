import mongoose from "mongoose";

// Definir la interfaz para el documento Producto
interface Producto extends Document {
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  brand?: string;
  sku?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Definir el esquema de Producto
const productoSchema = new mongoose.Schema<Producto>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true},
  stock: { type: Number},
  brand: { type: String},
  sku: { type: String},
  tags: {  type: [String], default: []},
}, {
    timestamps: true
});

// Crear el modelo Producto
const Producto = mongoose.model<Producto>("Producto", productoSchema, "productos");

export default Producto;