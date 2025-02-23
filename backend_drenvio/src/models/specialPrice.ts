import mongoose from "mongoose";
import { SpecialPriceEntry } from "../types";

const specialPriceSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    specialPrice: { type: Number, required: true }
});

export const SpecialPrice = mongoose.model<SpecialPriceEntry>("PrecioEspecialPoveda10", specialPriceSchema);