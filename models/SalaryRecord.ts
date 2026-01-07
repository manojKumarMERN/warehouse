import { Schema, model, models, Types } from "mongoose";

const SalaryRecordSchema = new Schema(
  {
    worker: { type: Types.ObjectId, ref: "Worker", required: true },
    jobWork: { type: Types.ObjectId, ref: "JobWork", required: true },
    

    calculationMethod: {
      type: String,
      enum: [
        "per_gram",
        "per_piece",
        "fixed_per_job",
        "monthly",
        "time_based"
      ],
      required: true
    },

    finalProductWeight: { type: Number, required: true },
    baseAmount: { type: Number, required: true },

    wastageDeduction: { type: Number, default: 0 },
    bonusAmount: { type: Number, default: 0 },

    finalPayment: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "paid"],
      default: "pending",
    },

    paymentDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default models.SalaryRecord || model("SalaryRecord", SalaryRecordSchema);
