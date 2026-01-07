import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const refreshToken = req.headers
        .get("cookie")
        ?.split("refreshToken=")[1];

    if (!refreshToken) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as any;

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET!,
            { expiresIn: "10m" }
        );

        return NextResponse.json({
            accessToken: newAccessToken,
        });
    } catch {
        return NextResponse.json(
            { message: "Invalid refresh token" },
            { status: 401 }
        );
    }
}
