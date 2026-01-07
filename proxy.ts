import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";

export async function proxy(req: NextRequest) {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith("/users/login") ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/")
    ) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    try {
        const decoded: any = verifyToken(token);

        const allowedRoles = ["admin", "user"];
        if (!allowedRoles.includes(decoded.role)) {
            return NextResponse.json({ message: "Access denied" }, { status: 403 });
        }

        return NextResponse.next();
    } catch {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}
