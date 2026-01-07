import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Customer from "@/models/Customer";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { page = 1, limit = 10, paymentStatus, search, fromDate, toDate } =
            await req.json();

        const query: any = {};

        // Filter by payment status
        if (paymentStatus) query.paymentStatus = paymentStatus;

        // Date range filter
        if (fromDate && toDate) {
            query.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };
        }

        // Search invoice no or customer name/phone
        if (search) {
            const customers = await Customer.find({
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { phone: { $regex: search, $options: "i" } },
                ],
            }).select("_id");

            query.$or = [
                { invoiceNo: { $regex: search, $options: "i" } },
                { customer: { $in: customers.map((c) => c._id) } },
            ];
        }

        const skip = (page - 1) * limit;

        const orders = await Order.find(query)
            .populate("customer")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Order.countDocuments(query);

        return NextResponse.json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalOrders: total,
            orders,
        });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}
