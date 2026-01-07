import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SalaryRecord from "@/models/SalaryRecord";

export async function PUT(req: Request, { params }: any) {
    await connectDB();
    const { status } = await req.json();

    const record = await SalaryRecord.findByIdAndUpdate(
        params.id,
        {
            status,
            paymentDate: status === "paid" ? new Date() : undefined,
        },
        { new: true }
    );

    return NextResponse.json({ success: true, record });
}
