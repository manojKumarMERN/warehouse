import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Worker from "@/models/Worker";
import { proxy as authMiddleware } from "@/proxy";

export async function POST(req: Request) {
    const auth = await authMiddleware(req as any, ["super_admin", "admin"]);
    if (auth) return auth;

    await connectDB();
    const data = await req.json();
    const worker = await Worker.create(data);
    return NextResponse.json({ message: "Worker created", worker });
}
