import mongoose, { Schema, Document } from "mongoose";

export interface IStock extends Document {
  metalType: "gold" | "silver" | "copper";
  purity: string;
  availableWeight: number;
  wastageWeight: number;
}

const StockSchema = new Schema<IStock>(
  {
    metalType: { type: String, enum: ["gold", "silver", "copper"], required: true },
    purity: { type: String, required: true },
    availableWeight: { type: Number, default: 0 },
    wastageWeight: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Stock || mongoose.model<IStock>("Stock", StockSchema);
