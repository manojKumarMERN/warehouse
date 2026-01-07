import { Schema, model, models, Types } from "mongoose";

const PurchaseOrderSchema = new Schema(
    {
        supplier: { type: Types.ObjectId, ref: "Supplier", required: true },
        invoiceNumber: { type: String, required: true, unique: true },

        items: [
            {
                material: { type: ["gold", "silver", "copper"], required: true }, // Gold / Silver / Copper / Stone
                purity: { type: Number }, // Example: 22KT -> 91.6
                weightInGram: { type: Number, required: true }, // ex: 150g
                unitPrice: { type: Number, required: true }, // per gram price
                totalPrice: { type: Number, required: true },
            },
        ],

        subTotal: { type: Number, required: true },
        tax: { type: Number, default: 0 },
        grandTotal: { type: Number, required: true },

        paymentStatus: {
            type: String,
            enum: ["pending", "partially_paid", "paid"],
            default: "pending",
        },
        paidAmount: { type: Number, default: 0 },

        purchaseDate: { type: Date, default: Date.now },
        notes: { type: String },
    },
    { timestamps: true }
);

export default models.PurchaseOrder || model("PurchaseOrder", PurchaseOrderSchema);
