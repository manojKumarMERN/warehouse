import mongoose, { Schema, Document } from "mongoose";

export interface IAttendance extends Document {
    worker: string;
    date: string; // "2025-11-22"
    checkIn: Date;
    checkOut?: Date;
    totalHours: number;
}

const AttendanceSchema = new Schema<IAttendance>(
    {
        worker: { type: Schema.Types.ObjectId as any , ref: "Worker", required: true },
        date: { type: String, required: true },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date },
        totalHours: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Attendance ||
    mongoose.model<IAttendance>("Attendance", AttendanceSchema);
