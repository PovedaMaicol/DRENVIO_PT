import mongoose from "mongoose";

// defino mis tipos
export interface SpecialPriceEntry {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    specialPrice: number;
}

export interface UsuarioEntry {
    _id: string,
    nombre: string,
    email: string,
    password: string,
    role: "user" | "admin",
    preciosEspeciales: string[],
    __v: number

}

