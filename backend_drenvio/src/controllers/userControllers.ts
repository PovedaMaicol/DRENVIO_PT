import mongoose from "mongoose";
import { Request, Response } from "express"; 

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await mongoose.connection.collection("usuarios").find({}).toArray(); 
        res.json(usuarios);
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};
