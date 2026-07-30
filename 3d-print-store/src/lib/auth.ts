// src/lib/auth.ts
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export interface AppUser {
    uid: string;
    email: string;
    name: string;
    mobile?: string;
    userType: "Admin" | "Customer";
}

export async function getSession(): Promise<{ user: AppUser | null }> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return { user: null };
        }

        // 1. Verify the HTTP-Only session cookie
        const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);

        // 2. Fetch the latest user profile from Firestore using UID
        const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();

        if (!userDoc.exists) {
            return { user: null };
        }

        const userData = userDoc.data();

        return {
            user: {
                uid: decodedToken.uid,
                email: userData?.email || decodedToken.email || "",
                name: userData?.name || "User",
                mobile: userData?.mobile || "",
                userType: userData?.userType || "Customer",
            },
        };
    } catch (error) {
        console.error("Session verification failed:", error);
        return { user: null };
    }
}