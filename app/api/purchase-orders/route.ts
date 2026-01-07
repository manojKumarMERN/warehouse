import { NextResponse } from "next/server";
import PurchaseOrder from "@/models/PurchaseOrder";
import { connectDB } from "@/lib/db";
import { updateInventoryAfterPurchase } from "@/services/inventoryUpdateService";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Create Purchase Order
    const order = await PurchaseOrder.create(data);

    // Update Inventory
    await updateInventoryAfterPurchase(data.items);

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
    await connectDB();
    const orders = await PurchaseOrder.find().populate("supplier");
    return NextResponse.json({ success: true, orders });
}
