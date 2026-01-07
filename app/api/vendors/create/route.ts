import { NextResponse } from "next/server";
import Vendor from "@/models/Vendor";
import { connectDB } from "@/lib/db";
import { proxy as authMiddleware } from "@/proxy";


export async function POST(req: Request) {
    const auth = await authMiddleware(req as any, ["super_admin", "admin"]);
    if (auth) return auth;

    await connectDB();
    const data = await req.json();
    const vendor = await Vendor.create(data);
    return NextResponse.json({ message: "Vendor added", vendor });
}
