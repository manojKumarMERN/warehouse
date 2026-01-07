import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "super_admin" | "admin" | "worker" | "qc";
    phone?: string;
    status: "active" | "inactive";
    userId: string;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["super_admin", "admin", "worker", "qc"],
            default: "worker"
        },
        phone: { type: String },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        userId: { type: String, unique: true },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
