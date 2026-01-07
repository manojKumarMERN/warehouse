import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import Worker from "@/models/Worker";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { workerId } = await req.json();

        const today = new Date().toISOString().split("T")[0];

        // Find today's attendance record
        const attendance = await Attendance.findOne({ worker: workerId, date: today });
        if (!attendance) {
            return NextResponse.json(
                { success: false, message: "Check-in not found" },
                { status: 400 }
            );
        }

        if (attendance.checkOut) {
            return NextResponse.json(
                { success: false, message: "Already checked-out" },
                { status: 400 }
            );
        }

        const checkOutTime = new Date();
        const hours =
            (checkOutTime.getTime() - attendance.checkIn.getTime()) / (1000 * 60 * 60);

        attendance.checkOut = checkOutTime;
        attendance.totalHours = Number(hours.toFixed(2));
        await attendance.save();

        await Worker.findByIdAndUpdate(workerId, {
            lastCheckOut: checkOutTime,
            isPresentToday: false,
        });

        return NextResponse.json({ success: true, attendance });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
