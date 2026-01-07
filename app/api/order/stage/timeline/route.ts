import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    const order = await Order.findById(orderId)
      .populate("stages.assignedTo", "name photo");

    if (!order) throw new Error("Order not found");

    return NextResponse.json({ success: true, stages: order.stages });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
