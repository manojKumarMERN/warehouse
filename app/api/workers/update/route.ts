import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Worker from "@/models/Worker";
import { proxy as authMiddleware } from "@/proxy";

export async function PATCH(req: Request) {
  const auth = await authMiddleware(req as any, ["super_admin", "admin"]);
  if (auth) return auth;

  await connectDB();
  const { id, data } = await req.json();
  const worker = await Worker.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json({ message: "Worker updated", worker });
}
