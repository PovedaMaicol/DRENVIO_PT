import { SpecialPrice } from "../models/specialPrice";
import { SpecialPriceEntry } from "../types";

// Obtener todos los precios especiales
export const getPreciosEspeciales = async () => {
  return await SpecialPrice.find();
};

// Obtener precios especiales por usuario
export const getPreciosPorUsuario = async (userId: string) => {
  return await SpecialPrice.find({ userId });
};

// Agregar un nuevo precio especial
export const addPrecioEspecial = async (precioEspecial: SpecialPriceEntry) => {
  const nuevoPrecio = new SpecialPrice(precioEspecial);
  return await nuevoPrecio.save();
};

// Actualizar un precio especial
export const updatePrecioEspecial = async (userId: string, productoId: string, nuevoPrecio: number) => {
  return await SpecialPrice.findOneAndUpdate(
    { userId, productoId },
    { precioEspecial: nuevoPrecio },
    { new: true }
  );
};
