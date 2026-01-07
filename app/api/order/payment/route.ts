import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Payment from "@/models/Payment";

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json(); // orderId, customerId, amount, paymentMethod

        const order = await Order.findById(data.orderId);
        if (!order) throw new Error("Order not found");

        // Create payment history entry
        await Payment.create({
            order: data.orderId,
            customer: data.customerId,
            amount: data.amount,
            paymentMethod: data.paymentMethod,
            remarks: data.remarks,
            transactionId: data.transactionId,
        });

        // Update totals
        order.advancePaid += data.amount;
        order.dueAmount = order.grandTotal - order.advancePaid;

        if (order.dueAmount <= 0) {
            order.paymentStatus = "paid";
            order.dueAmount = 0;
        } else {
            order.paymentStatus = "partial";
        }

        await order.save();

        return NextResponse.json({ success: true, order });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
