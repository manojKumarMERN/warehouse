import { NextResponse } from "next/server";
import Supplier from "@/models/Supplier";
import { connectDB } from "@/lib/db";

export async function GET(req: Request, { params }: any) {
  await connectDB();
  const supplier = await Supplier.findById(params.id);
  return NextResponse.json({ success: true, supplier });
}

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const data = await req.json();
  const supplier = await Supplier.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json({ success: true, supplier });
}

export async function DELETE(req: Request, { params }: any) {
  await connectDB();
  await Supplier.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: "Supplier deleted" });
}
