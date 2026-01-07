import mongoose, { Schema, Document } from "mongoose";

export interface IRawMaterial extends Document {
  materialType: "gold" | "silver" | "stone";
  purity?: string;
  weight: number; // current available weight
  ratePerGram?: number;
  minStock?: number;
}

const RawMaterialSchema = new Schema<IRawMaterial>({
  materialType: { type: String, required: true },
  purity: String,
  weight: { type: Number, default: 0 },
  ratePerGram: Number,
  minStock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.RawMaterial || mongoose.model<IRawMaterial>("RawMaterial", RawMaterialSchema);
