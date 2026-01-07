import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
    await connectDB();
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ message: "No token" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password");
    return NextResponse.json({ user });
}
