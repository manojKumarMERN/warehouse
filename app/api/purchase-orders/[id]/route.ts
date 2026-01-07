import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PurchaseOrder from "@/models/PurchaseOrder";

export async function GET(req: Request, { params }: any) {
    await connectDB();
    const order = await PurchaseOrder.findById(params.id).populate("supplier");
    return NextResponse.json({ success: true, order });
}

export async function PUT(req: Request, { params }: any) {
    await connectDB();
    const data = await req.json();
    const order = await PurchaseOrder.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json({ success: true, order });
}

export async function DELETE(req: Request, { params }: any) {
    await connectDB();
    await PurchaseOrder.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Purchase Order deleted" });
}
