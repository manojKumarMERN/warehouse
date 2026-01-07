import { NextResponse } from "next/server";
import Supplier from "@/models/Supplier";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();
    const supplier = await Supplier.create(data);
    return NextResponse.json({ success: true, supplier });
}

export async function GET() {
    await connectDB();
    const suppliers = await Supplier.find();
    return NextResponse.json({ success: true, suppliers });
}
