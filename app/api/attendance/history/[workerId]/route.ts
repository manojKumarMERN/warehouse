import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function GET(
    req: Request,
    { params }: { params: { workerId: string } }
) {
    try {
        await connectDB();
        const records = await Attendance.find({ worker: params.workerId })
            .sort({ date: -1 });

        return NextResponse.json({ success: true, records });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
