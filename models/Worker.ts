import mongoose, { Schema, Document } from "mongoose";

export interface IWorker extends Document {
    userId: string;
    skill: string;
    hourlyRate?: number;
    perGramRate?: number;
    perPieceRate?: number;

    bankDetails: {
        accountHolder: string;
        bankName: string;
        accountNumber: string;
        ifsc: string;
        upiId?: string;
    };

    documents: {
        aadhaarUrl?: string;
        panUrl?: string;
        photoUrl?: string;
    };

    // Salary wallet
    pendingSalary: number;
    totalPaidSalary: number;

    // Metrics for ranking
    rating: number; // avg QC score 0–10
    completedJobs: number;
    totalWastage: number;
    totalBonusEarned: number;

    // Attendance
    lastCheckIn?: Date;
    lastCheckOut?: Date;
    isPresentToday: boolean;
    monthlyPresentDays: number;

    status: "active" | "inactive";
}

const WorkerSchema = new Schema<IWorker>(
    {
        userId: { type: Schema.Types.ObjectId as any, ref: "User", required: true },
        skill: { type: String, required: true },

        hourlyRate: { type: Number },
        perGramRate: { type: Number },
        perPieceRate: { type: Number },

        bankDetails: {
            accountHolder: String,
            bankName: String,
            accountNumber: String,
            ifsc: String,
            upiId: String,
        },

        documents: {
            aadhaarUrl: String,
            panUrl: String,
            photoUrl: String,
        },

        status: { type: String, enum: ["active", "inactive"], default: "active" },
    },
    { timestamps: true }
);

export default mongoose.models.Worker ||
    mongoose.model<IWorker>("Worker", WorkerSchema);
