import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import Worker from "@/models/Worker";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { workerId } = await req.json();

        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        // Prevent repeated check-in
        const existing = await Attendance.findOne({ worker: workerId, date: today });
        if (existing) {
            return NextResponse.json(
                { success: false, message: "Already checked-in" },
                { status: 400 }
            );
        }

        const attendance = await Attendance.create({
            worker: workerId,
            date: today,
            checkIn: new Date(),
        });

        // Update worker presence
        await Worker.findByIdAndUpdate(workerId, {
            isPresentToday: true,
            lastCheckIn: new Date(),
            $inc: { monthlyPresentDays: 1 },
        });

        return NextResponse.json({ success: true, attendance });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
