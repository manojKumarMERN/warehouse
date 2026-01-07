import mongoose, { Schema, Document } from "mongoose";

export interface IFinishedProduct extends Document {
    sku: string;
    name: string;
    category: string;

    material: "gold" | "silver" | "copper";
    purity: string; // 18k / 22k / 999 etc.

    grossWeight: number;
    netWeight: number;
    stoneWeight?: number;

    makingCharge: number;
    stoneCharge?: number;
    wastageCharge?: number;
    totalCost: number;

    worker: Schema.Types.ObjectId; // who made the product
    jobWork: Schema.Types.ObjectId; // reference to job work entry

    status: "in-stock" | "sold";
}

const FinishedProductSchema = new Schema<IFinishedProduct>(
    {
        sku: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        category: { type: String },

        material: { type: String, enum: ["gold", "silver", "copper"], required: true },
        purity: { type: String, required: true },

        grossWeight: { type: Number, required: true },
        netWeight: { type: Number, required: true },
        stoneWeight: { type: Number },

        makingCharge: { type: Number, required: true },
        stoneCharge: { type: Number },
        wastageCharge: { type: Number },
        totalCost: { type: Number, required: true },

        worker: { type: Schema.Types.ObjectId, ref: "Worker" },
        jobWork: { type: Schema.Types.ObjectId, ref: "JobWork" },

        status: { type: String, enum: ["in-stock", "sold"], default: "in-stock" },
    },
    { timestamps: true }
);

export default mongoose.models.FinishedProduct ||
    mongoose.model<IFinishedProduct>("FinishedProduct", FinishedProductSchema);
