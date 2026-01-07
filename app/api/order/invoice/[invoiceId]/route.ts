import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";
import Order from "@/models/Order";

interface Params {
    params: { invoiceId: string };
}

export async function GET(req: Request, { params }: Params) {
    try {
        await connectDB();
        const { invoiceId } = params;

        const invoice = await Invoice.findById(invoiceId)
            .populate({
                path: "order",
                populate: [{ path: "customer" }, { path: "product" }],
            })
            .lean();

        if (!invoice) {
            return NextResponse.json(
                { success: false, message: "Invoice not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, invoice });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}
