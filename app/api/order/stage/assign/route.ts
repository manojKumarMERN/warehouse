import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { orderId, stageName, workerId } = await req.json();

        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        const stage = order.stages.find((s: any) => s.name === stageName);
        if (!stage) throw new Error("Stage not found");

        stage.assignedTo = workerId;
        await order.save();

        return NextResponse.json({ success: true, message: "Worker assigned", order });

    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
