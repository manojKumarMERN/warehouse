import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import JobWork from "@/models/JobWork";
import QualityCheck from "@/models/QualityCheck";

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();

    // Save QC record
    const qc = await QualityCheck.create(data);

    // Update job status based on QC
    if (data.status === "passed") {
        await JobWork.findByIdAndUpdate(data.jobWork, {
            manufacturingStage: "completed",
            status: "completed"
        });
    } else {
        await JobWork.findByIdAndUpdate(data.jobWork, {
            manufacturingStage: "rework",
            status: "in_progress",
            worker: data.reworkAssignedTo || undefined
        });
    }

    return NextResponse.json({ success: true, qc });
}
