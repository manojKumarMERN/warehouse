import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import JobWork from "@/models/JobWork";
import { calculateWastage } from "@/services/wastageService";

export async function PUT(req: Request, { params }: any) {
    await connectDB();
    const data = await req.json();

    const job = await JobWork.findById(params.id);

    job.returnedItems = data.returnedItems;
    job.finalProductWeight = data.finalProductWeight;

    job.wastageWeight = calculateWastage(
        job.assignedItems,
        data.returnedItems,
        data.finalProductWeight
    );

    job.status = "completed";
    job.manufacturingStage = "qc_pending";
    job.endDate = new Date();

    await job.save();
    return NextResponse.json({ success: true, job });
}
