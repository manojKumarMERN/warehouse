import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { orderId } = await req.json();
        const history = await Payment.find({ order: orderId }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, history });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
