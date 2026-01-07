import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  order: string;
  invoiceNumber: string;
  invoiceDate: Date;

  // metal calculation
  metalType: string; // Gold / Silver / Copper
  purity: string;    // 916, 22K, etc
  finalWeight: number; // in grams
  metalRate: number;  // per gram
  metalAmount: number;

  // stone
  stoneWeight?: number; // in carat / gram
  stoneRate?: number;
  stoneAmount?: number;
     
  // making charges
  makingCharge: number;
  wastageCharge: number;
  discount?: number;

  // tax
  gstPercent: number;
  gstAmount: number;

  // totals
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: "paid" | "partial" | "pending";

  // additional
  paymentMethod?: string;
  notes?: string;
  amountInWords?: string;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    order: { type: Schema.Types.ObjectId as any, ref: "Order", required: true },

    invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, default: Date.now },

    metalType: String,
    purity: String,
    finalWeight: Number,
    metalRate: Number,
    metalAmount: Number,

    stoneWeight: Number,
    stoneRate: Number,
    stoneAmount: Number,

    makingCharge: Number,
    wastageCharge: Number,
    discount: { type: Number, default: 0 },

    gstPercent: { type: Number, default: 3 },
    gstAmount: Number,

    totalAmount: Number,
    paidAmount: { type: Number, default: 0 },
    balance: Number,

    status: {
      type: String,
      enum: ["paid", "partial", "pending"],
      default: "pending",
    },

    paymentMethod: String,
    notes: String,
    amountInWords: String,
  },
  { timestamps: true }
);

export default mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);
