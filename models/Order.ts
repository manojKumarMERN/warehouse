import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    invoiceNo: string;
    customer: Schema.Types.ObjectId;
    items: {
        product: Schema.Types.ObjectId;
        quantity: number;
        rate: number;
        total: number;
    }[];

    subTotal: number;
    gstPercent: number;
    gstAmount: number;
    grandTotal: number;
    paymentStatus: "pending" | "partial" | "paid";
    dueAmount: number;
    advancePaid: number;
    notes?: string;

    // 🔥 STAGES INSIDE ORDER
    stages: {
        name: "casting" | "qc" | "polishing" | "packing" | "delivered";
        worker: Schema.Types.ObjectId | null;
        status: "pending" | "in-progress" | "completed" | "reassigned";
        startDate?: Date;
        completedDate?: Date;
        expectedDate?: Date;
        previousWorker?: Schema.Types.ObjectId | null;
        reassignReason?: string;
    }[];
}

const OrderSchema = new Schema<IOrder>(
    {
        invoiceNo: { type: String, required: true, unique: true },
        customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },

        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: "FinishedProduct", required: true },
                quantity: { type: Number, required: true },
                rate: { type: Number, required: true },
                total: { type: Number, required: true },
            },
        ],

        subTotal: { type: Number, required: true },
        gstPercent: { type: Number, default: 3 },
        gstAmount: { type: Number, required: true },
        grandTotal: { type: Number, required: true },

        paymentStatus: {
            type: String,
            enum: ["pending", "partial", "paid"],
            default: "pending",
        },

        advancePaid: { type: Number, default: 0 },
        dueAmount: { type: Number, default: 0 },

        notes: { type: String },

        // 👇 All STAGES inside order
        stages: [
            {
                name: {
                    type: String,
                    enum: ["casting", "qc", "polishing", "packing", "delivered"],
                    required: true,
                },
                worker: { type: Schema.Types.ObjectId, ref: "Worker", default: null },
                status: {
                    type: String,
                    enum: ["pending", "in-progress", "completed", "reassigned"],
                    default: "pending",
                },
                startDate: Date,
                completedDate: Date,
                expectedDate: Date,
                previousWorker: { type: Schema.Types.ObjectId, ref: "Worker", default: null },
                reassignReason: { type: String },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
