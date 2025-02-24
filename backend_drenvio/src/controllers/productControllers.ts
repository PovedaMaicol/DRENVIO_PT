import mongoose from "mongoose";
import { Request, Response } from "express"; 

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await mongoose.connection.collection("productos").find({}).toArray(); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

