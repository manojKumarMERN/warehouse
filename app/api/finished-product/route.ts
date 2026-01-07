import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FinishedProduct from "@/models/FinishedProduct";
import { updateInventoryAfterProductAdd } from "@/services/stockLedgerService";

export async function POST(req: Request) {
    try {
        await connectDB();
        const data = await req.json();

        // auto calculate cost (if not already)
        data.totalCost =
            (data.makingCharge ?? 0) +
            (data.stoneCharge ?? 0) +
            (data.wastageCharge ?? 0);

        const product = await FinishedProduct.create(data);

        // Update warehouse stock ledger
        await updateInventoryAfterProductAdd(product);

        return NextResponse.json({ success: true, product });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
