import { NextResponse } from "next/server";
import Vendor from "@/models/Vendor";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  const vendors = await Vendor.find();
  return NextResponse.json({ vendors });
}
