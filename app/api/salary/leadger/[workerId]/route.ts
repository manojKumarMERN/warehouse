import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SalaryPayment from "@/models/SalaryPayment";

export async function GET(
    req: Request,
    { params }: { params: { workerId: string } }
) {
    try {
        await connectDB();
        const payments = await SalaryPayment.find({
            worker: params.workerId,
        }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, payments });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
