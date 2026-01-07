import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { orderId } = await req.json();

        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        const current = order.stages.find((s: any) => s.status === "in-progress");
        const nextIndex = order.stages.findIndex((s: any) => s.status === "pending");

        if (current) {
            current.status = "completed";
            current.endTime = new Date();
        }

        if (nextIndex !== -1) {
            order.stages[nextIndex].status = "in-progress";
            order.stages[nextIndex].startTime = new Date();
        } else {
            order.status = "completed"; // full order completed
        }

        await order.save();

        return NextResponse.json({ success: true, message: "Stage auto progressed", order });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
