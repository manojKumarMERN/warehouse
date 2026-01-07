import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Worker from "@/models/Worker";
import { proxy as authMiddleware } from "@/proxy";

export async function GET(req: Request) {
  const auth = await authMiddleware(req as any, ["super_admin", "admin"]);
  if (auth) return auth;

  await connectDB();
  const workers = await Worker.find().populate("userId", "-password");
  return NextResponse.json({ workers });
}
