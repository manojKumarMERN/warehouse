import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
    order: Schema.Types.ObjectId;
    customer: Schema.Types.ObjectId;
    amount: number;
    paymentMethod: string;
    transactionId?: string;
    remarks?: string;
}

const PaymentSchema = new Schema<IPayment>(
    {
        order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
        customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
        amount: { type: Number, required: true },
        paymentMethod: { type: String, enum: ["cash", "bank", "upi", "card"], required: true },
        transactionId: String,
        remarks: String,
    },
    { timestamps: true }
);

export default mongoose.models.Payment ||
    mongoose.model<IPayment>("Payment", PaymentSchema);
