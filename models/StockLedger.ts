import mongoose, { Schema, Document } from "mongoose";

export interface IStockLedger extends Document {
    type: "IN" | "OUT";
    reference: string;
    referenceId: Schema.Types.ObjectId;
    material: string;
    weight: number;
    ratePerGram?: number;
    cost: number;
}

const StockLedgerSchema = new Schema<IStockLedger>(
    {
        type: { type: String, enum: ["IN", "OUT"], required: true },
        reference: { type: String, required: true },
        referenceId: { type: Schema.Types.ObjectId, required: true },
        material: { type: String, required: true },
        weight: { type: Number, required: true },
        ratePerGram: Number,
        cost: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.StockLedger ||
    mongoose.model<IStockLedger>("StockLedger", StockLedgerSchema);
