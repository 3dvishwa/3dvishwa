// src/app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
        }

        // Session cookie valid for 5 days
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        const response = NextResponse.json({ ok: true }, { status: 200 });

        // Set cookie on the response
        response.cookies.set("session", sessionCookie, {
            maxAge: expiresIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return response;
    } catch (error: any) {
        console.error("Failed to create session cookie:", error);
        return NextResponse.json({ error: error.message || "Unauthorized" }, { status: 401 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ ok: true }, { status: 200 });

    // Explicitly override and invalidate the session cookie at root path "/"
    response.cookies.set("session", "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return response;
}