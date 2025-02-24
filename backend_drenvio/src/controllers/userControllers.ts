import mongoose from "mongoose";
import { Request, Response } from "express"; 
import Usuario from "../models/usuario";

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await Usuario.aggregate([
            {
                $lookup: {
                    from: "preciosEspecialesPoveda10", // Colección de precios especiales
                    localField: "_id",  // ID del usuario en `usuarios`
                    foreignField: "userId",  // ID del usuario en `preciosEspecialesPoveda10`
                    as: "preciosEspeciales"  // Se guardan los precios especiales dentro del usuario
                }
            }
        ])
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getUserId = async (id: string) => {
    try {
        if (!id) throw new Error("El ID del usuario es requerido.");
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("El ID proporcionado no es válido.");

        const usuario = await Usuario.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Buscar usuario por ID
            {
                $lookup: {
                    from: "preciosEspecialesPoveda10", // Nombre de la colección en MongoDB (importante: debe estar en minúsculas)
                    localField: "_id",  // ID del usuario en la colección `usuarios`
                    foreignField: "userId",  // ID del usuario en `preciosEspecialesPoveda10`
                    as: "preciosEspeciales"  // Nombre del campo donde se guardará el resultado
                }
            }
        ]);

        if (!usuario.length) throw new Error("Usuario no encontrado.");
        return usuario[0]; // Retorna el usuario con los precios especiales incluidos
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error interno del servidor al obtener el usuario.");
    }
};
