import { connectDB } from "@/lib/db";
import RawMaterial from "@/models/RawMaterial";
import StockLedger from "@/models/StockLedger";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();

    const material = await RawMaterial.findById(data.materialId);
    if (!material) throw new Error("Material not found");

    if (material.weight < data.weight) throw new Error("Insufficient stock");

    material.weight -= data.weight;
    await material.save();

    await StockLedger.create({
        type: "OUT",
        material: material._id,
        reference: data.reference,
        referenceId: data.referenceId,
        weight: data.weight,
        remarks: data.remarks
    });

    return NextResponse.json({ success: true, message: "Stock deducted successfully" });
}
