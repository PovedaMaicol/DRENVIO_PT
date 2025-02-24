import mongoose from "mongoose";
import { SpecialPriceEntry } from "../types";

const specialPriceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'usuarios' },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    specialPrice: { type: Number, required: true },

});

export const SpecialPrice = mongoose.model<SpecialPriceEntry>("SpecialPrice", specialPriceSchema,  "preciosEspecialesPoveda10");