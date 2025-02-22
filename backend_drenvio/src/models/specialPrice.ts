import mongoose from "mongoose";

export interface IspecialPrice extends Document {
    userId?: string;
    prouctId?: string;
    price: number;
    startDate: Date;
    endDate: Date;
    status: boolean;
  }

const specialPriceSchema = new mongoose.Schema({
    userId: { type: String },
    productId: { type: Number},
    price: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: Boolean, required: true }
});

export const SpecialPrice = mongoose.model<IspecialPrice>("PrecioEspecialPoveda10", specialPriceSchema);