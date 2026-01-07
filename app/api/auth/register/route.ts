import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/Users";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password, role, phone, status } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ message: "Email already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "worker",
    phone,
    status: status || "active",
  });

  return NextResponse.json({ message: "User registered", user });
}
