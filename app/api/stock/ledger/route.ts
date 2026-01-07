import { connectDB } from "@/lib/db";
import StockLedger from "@/models/StockLedger";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDB();
    const ledger = await StockLedger.find()
        .populate("material")
        .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: ledger });
}
