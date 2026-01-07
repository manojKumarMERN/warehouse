import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    gstNumber?: string;
}

const CustomerSchema = new Schema<ICustomer>(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        address: String,
        gstNumber: String,
    },
    { timestamps: true }
);

export default mongoose.models.Customer ||
    mongoose.model<ICustomer>("Customer", CustomerSchema);
