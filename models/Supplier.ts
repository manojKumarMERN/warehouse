import { Schema, model, models } from "mongoose";

const SupplierSchema = new Schema(
    {
        name: { type: String, required: true },
        company: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        gstNumber: { type: String }, 
        materialTypes: [{ type: String }], 
        status: { type: String, enum: ["active", "inactive"], default: "active" },
    },
    { timestamps: true }
);

export default models.Supplier || model("Supplier", SupplierSchema);
