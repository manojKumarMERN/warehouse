import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";

export async function GET(req: Request, { params }: any) {
  try {
    await connectDB();
    const payments = await Payment.find({ invoice: params.invoiceId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: payments });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
