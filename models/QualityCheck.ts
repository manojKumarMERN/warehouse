import { Schema, model, models, Types } from "mongoose";

const QualityCheckSchema = new Schema(
    {
        jobWork: { type: Types.ObjectId, ref: "JobWork", required: true },
        qcOfficer: { type: Types.ObjectId, ref: "User", required: true }, // QC inspector

        status: {
            type: String,
            enum: ["passed", "rejected", "rework_required"],
            required: true,
        },

        qcScore: { type: Number, min: 1, max: 10, required: true }, // 1–10 scale
        remarks: { type: String },

        defects: [String], // eg: "Polish issue", "Stone loose"

        reworkAssignedTo: { type: Types.ObjectId, ref: "Worker" },
        images: [String], // photo proof of QC

        qcDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default models.QualityCheck || model("QualityCheck", QualityCheckSchema);
