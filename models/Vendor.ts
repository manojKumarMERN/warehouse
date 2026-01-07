import mongoose, { Schema, Document } from "mongoose";

export interface IVendor extends Document {
    name: string;
    phone: string;
    email?: string;
    gstNumber?: string;
    materialType: string;
}

const VendorSchema = new Schema<IVendor>(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        gstNumber: String,
        materialType: { type: String, enum: ["gold", "silver", "copper"] },
    },
    { timestamps: true }
);

export default mongoose.models.Vendor || mongoose.model<IVendor>("Vendor", VendorSchema);
