import { NextResponse } from "next/server";
import Purchase from "@/models/Purchase";
import Stock from "@/models/Stocks";
import { connectDB } from "@/lib/db";
import { proxy as authMiddleware } from "@/proxy";

export async function POST(req: Request) {
  const auth = await authMiddleware(req as any, ["super_admin", "admin"]);
  if (auth) return auth;

  await connectDB();
  const data = await req.json();
  const purchase = await Purchase.create(data);

  const stock = await Stock.findOne({
    metalType: data.metalType,
    purity: data.purity,
  });

  if (stock) {
    stock.availableWeight += data.netWeight;
    await stock.save();
  } else {
    await Stock.create({
      metalType: data.metalType,
      purity: data.purity,
      availableWeight: data.netWeight,
    });
  }

  return NextResponse.json({ message: "Purchase recorded & stock updated", purchase });
}
