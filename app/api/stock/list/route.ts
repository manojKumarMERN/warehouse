import { NextResponse } from "next/server";
import Stock from "@/models/Stocks";
import { connectDB } from "@/lib/db";

export async function GET() {
    await connectDB();
    const stock = await Stock.find();
    return NextResponse.json({ stock });
}
