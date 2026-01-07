import mongoose, { Schema } from "mongoose";

const SalaryPaymentSchema = new Schema(
    {
        worker: { type: Schema.Types.ObjectId, ref: "Worker", required: true },
        amountPaid: { type: Number, required: true },
        paymentMethod: {
            type: String,
            enum: ["CASH", "BANK", "UPI", "WALLET_ADJUSTMENT"],
            required: true,
        },
        transactionId: { type: String }, // UPI/Bank reference number
        notes: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.SalaryPayment ||
    mongoose.model("SalaryPayment", SalaryPaymentSchema);
