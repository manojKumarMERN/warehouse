import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import JobWork from "@/models/JobWork";

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();
    const job = await JobWork.create(data);
    return NextResponse.json({ success: true, job });
}

export async function GET() {
    await connectDB();
    const jobs = await JobWork.find().populate("order worker");
    return NextResponse.json({ success: true, jobs });
}
