import { SpecialPrice } from "../models/specialPrice";
import { SpecialPriceEntry } from "../types";
import mongoose, {Types} from "mongoose";


export const getPreciosEspeciales = async () => {
  try {
    const preciosEspeciales = await SpecialPrice.find();
    return preciosEspeciales;
  } catch(error) {
    throw new Error(error instanceof Error ? error.message : "Error obteniendo los precios especiales.");
  }
};

export const getPrecioEspecialId = async (id: string) => {
  try {
    if (!id) {
      throw new Error("El ID del precio especial es requerido.");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("El ID proporcionado no es válido.");
    }

    const precioEspecial = await SpecialPrice.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) } // Filtrar por ID
      },
      {
        $lookup: {
          from: "productos", // Nombre de la colección en MongoDB
          localField: "productId",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      {
        $unwind: { path: "$productInfo", preserveNullAndEmptyArrays: true } // Desanidar array
      }
    ]);

    if (!precioEspecial || precioEspecial.length === 0) {
      throw new Error("Precio especial no encontrado.");
    }

    return precioEspecial[0]; // Devolver el primer resultado (ya que `aggregate` devuelve un array)
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error interno del servidor al obtener el precio especial.");
  }
};



// Agregar un nuevo precio especial y actualizar al usuario
export const addPrecioEspecial = async (precioEspecial: SpecialPriceEntry) => {
  try {

    if (!precioEspecial.userId || !precioEspecial.productId) {
      throw new Error("userId y productId son obligatorios.");
    }

    const usersCollection = mongoose.connection.collection("usuarios");

    const user = await usersCollection.findOne(
      { _id: new mongoose.Types.ObjectId(precioEspecial.userId) },
      { projection: { preciosEspeciales: 1 } }
    );

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    const existingSpecialPrice = await SpecialPrice.findOne({
      _id: { $in: user.preciosEspeciales },
      productId: precioEspecial.productId,
    });

    if (existingSpecialPrice) {
      throw new Error("Este producto ya tiene un precio especial asignado.");
    }

    const specialPrice = new SpecialPrice(precioEspecial);
    const addedSpecialPrice = await specialPrice.save();

    await usersCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(precioEspecial.userId) },
      {   
        $push: { 
          preciosEspeciales: addedSpecialPrice._id 
        } as unknown as mongoose.mongo.PushOperator<Types.ObjectId> // Tipar el $push
      }  
    );

    const populatedSprecialPrice = await SpecialPrice.findById(addedSpecialPrice._id)
    .populate("userId", "nombre role")
    .populate("productId", "name price")
    .exec()

    if(!populatedSprecialPrice) {
      throw new Error("No se pudo obtener el precio especial con los detalles poblados.");
    }

    return populatedSprecialPrice;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error al agregar precio especial.");
    } else {
      throw new Error("Error desconocido al agregar precio especial.");
    }
  }
};


export const deletePrecioEspecial = async (userId: string, precioEspecialId: string) => {
  try {

    const specialPrice = await SpecialPrice.findByIdAndDelete(precioEspecialId);

    if (!specialPrice) {
      throw new Error("Precio especial no encontrado.");
    }


    const usersCollection = mongoose.connection.collection("usuarios");

    await usersCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { 
        $pull: { 
          preciosEspeciales: new mongoose.Types.ObjectId(precioEspecialId) 
        } as unknown as mongoose.mongo.PullOperator<Types.ObjectId>
      }
    );

    return { message: "Precio especial eliminado correctamente." };
  } catch (error) {
    if (error instanceof Error ) {
      return { message: error.message || "No se pudo eliminar el precio especial"
      }

    } else {
      return { message: "No se pudo eliminar el precio especial." };
    }
   
  }
};

export const updatePrecioEspecial = async (userId: string, productoId: string, nuevoPrecio: number) => {
  try {

    const specialPrice = await SpecialPrice.findOne({ _id: productoId, userId });

    if (!specialPrice) {
      throw new Error("Precio especial no encontrado para el usuario y producto especificados.");
    }

    const updatedSpecialPrice = await SpecialPrice.findByIdAndUpdate(
      productoId,
      { specialPrice: nuevoPrecio },
      { new: true } 
    );

    if (!updatedSpecialPrice) {
      throw new Error("No se pudo actualizar el precio especial.");
    }

    return updatedSpecialPrice;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "No se pudo actualizar el precio especial.especial.");
  }
};

;
