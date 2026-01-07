import mongoose, { Schema, Document } from "mongoose";

export interface IOrderTimeline extends Document {
    order: string;
    stage: string; // Design, Casting, QC, etc.
    worker?: string;
    startTime?: Date;
    endTime?: Date;
    status: "pending" | "in-progress" | "completed";
    notes?: string;
}

const OrderTimelineSchema = new Schema<IOrderTimeline>(
    {
        order: { type: Schema.Types.ObjectId as any, ref: "Order", required: true },
        stage: { type: String, required: true },
        worker: { type: Schema.Types.ObjectId, ref: "Worker" },

        startTime: Date,
        endTime: Date,

        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },

        notes: String,
    },
    { timestamps: true }
);

export default mongoose.models.OrderTimeline ||
    mongoose.model<IOrderTimeline>("OrderTimeline", OrderTimelineSchema);
