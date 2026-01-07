import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
  vendorId: string;
  metalType: "gold" | "silver" | "copper";
  purity: string;
  grossWeight: number;
  netWeight: number;
  ratePerGram: number;
  totalAmount: number;
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    vendorId: { type: Schema.Types.ObjectId as any , ref: "Vendor", required: true },
    metalType: { type: String, enum: ["gold", "silver", "copper"], required: true },
    purity: { type: String, required: true },
    grossWeight: { type: Number, required: true },
    netWeight: { type: Number, required: true },
    ratePerGram: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Purchase || mongoose.model<IPurchase>("Purchase", PurchaseSchema);
