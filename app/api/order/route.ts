import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Customer from "@/models/Customer";
import FinishedProduct from "@/models/FinishedProduct";
import StockLedger from "@/models/StockLedger";
import { generateInvoice } from "@/utils/generateInvoice";
import Invoice from "@/models/Invoice";

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        // Generate next invoice
        const orderCount = await Order.countDocuments();
        const invoiceNo = generateInvoice(orderCount);

        // Calculate totals
        let subTotal = data.items.reduce((sum: number, item: any) => sum + item.total, 0);
        const gstAmount = (subTotal * data.gstPercent) / 100;
        const grandTotal = subTotal + gstAmount;

        // Auto Order Stages
        const defaultStages = [
            "casting",
            "qc",
            "polishing",
            "packing",
            "delivered"
        ];
        const stages = defaultStages.map(name => ({ name }));

        // Create order
        const order: any = await Order.create({
            ...data,
            invoiceNo,
            subTotal,
            gstAmount,
            grandTotal,
            stages, // 🔥 NEW — timeline inserted
        });

        // Stock Deduction
        for (const item of data.items) {
            const product = await FinishedProduct.findById(item.product);
            if (!product) continue;

            product.status = "sold";
            await product.save();

            await StockLedger.create({
                type: "OUT",
                reference: "Customer Order",
                referenceId: order._id,
                material: product.material,
                weight: product.netWeight,
                cost: product.totalCost,
            });
        }

        return NextResponse.json({
            success: true,
            message: "Order created successfully",
            order,
        });

    } catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const customer = searchParams.get("customer");
        const status = searchParams.get("status");
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        const filter: any = {};
        if (customer) filter.customer = customer;
        if (status) filter.status = status;
        if (from && to) filter.invoiceDate = { $gte: new Date(from), $lte: new Date(to) };

        const invoices = await Invoice.find(filter)
            .populate({ path: "order", populate: { path: "customer" } })
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: invoices });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
