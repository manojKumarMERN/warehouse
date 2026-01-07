import { connectDB } from "@/lib/db";
import RawMaterial from "@/models/RawMaterial";
import StockLedger from "@/models/StockLedger";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();

    let material = await RawMaterial.findOne({
        materialType: data.materialType,
        purity: data.purity
    });

    // create material entry if not exist
    if (!material) {
        material = await RawMaterial.create({
            materialType: data.materialType,
            purity: data.purity,
            weight: 0,
            ratePerGram: data.ratePerGram,
            minStock: data.minStock
        });
    }

    material.weight += data.weight;
    material.ratePerGram = data.ratePerGram;
    await material.save();

    await StockLedger.create({
        type: "IN",
        material: material._id,
        reference: "Stock Inward",
        weight: data.weight,
        ratePerGram: data.ratePerGram,
        remarks: data.remarks
    });

    return NextResponse.json({ success: true, message: "Stock added successfully" });
}
