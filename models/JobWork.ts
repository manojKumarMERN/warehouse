import { Schema, model, models, Types } from "mongoose";

const JobWorkSchema = new Schema(
    {
        jobCode: { type: String, required: true, unique: true }, // JW-2025-001

        order: { type: Types.ObjectId, ref: "Order", required: true }, // which order?
        worker: { type: Types.ObjectId, ref: "Worker", required: true },

        assignedItems: [
            {
                material: { type: String, required: true },     // Gold / Silver / Copper / Stone
                purity: { type: Number },                       // Metals only
                weightInGram: { type: Number, required: true }, // eg: 50g issued to worker
            }
        ],

        returnedItems: [
            {
                material: { type: String, required: true },
                weightInGram: { type: Number, required: true },
            }
        ],

        finalProductWeight: { type: Number, default: 0 }, // finished ornament weight
        wastageWeight: { type: Number, default: 0 },      // auto calculated

        manufacturingStage: {
            type: String,
            enum: [
                "design",
                "moulding",
                "casting",
                "filing",
                "polishing",
                "stone_setting",
                "qc_pending",
                "completed"
            ],
            default: "design",
        },

        status: {
            type: String,
            enum: ["pending", "in_progress", "completed"],
            default: "pending",
        },

        startDate: { type: Date },
        endDate: { type: Date },

        notes: { type: String },
    },
    { timestamps: true }
);

export default models.JobWork || model("JobWork", JobWorkSchema);
