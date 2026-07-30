'use client';

import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ShieldAlert } from "lucide-react";

export default function LogoutPage() {
    useEffect(() => {
        const performLogout = async () => {
            try {
                // 1. Delete HTTP-Only Server Session Cookie via your DELETE API
                await fetch("/api/auth/session", {
                    method: "DELETE",
                    credentials: "include",
                });

                // 2. Clear client-side Firebase Auth state
                await signOut(auth);

                // 3. Clear client-side cache & user state
                sessionStorage.clear();
                localStorage.clear();

                // 4. Force full page replace to clear Next.js client router cache
                window.location.replace("/");
            } catch (error) {
                console.error("Logout failed:", error);
                window.location.replace("/");
            }
        };

        performLogout();
    }, []);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-[#3E312C] font-sans">
            <div className="flex flex-col items-center gap-4 p-8 glass-card rounded-[24px] max-w-sm w-full text-center">
                <div className="p-3 rounded-[14px] bg-[#FCF8F3] border border-[#ECE2D3] text-[#3F5B43] animate-pulse">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold">Signing Out...</h1>
                <p className="text-xs text-[#65554D]">
                    Clearing your session and redirecting you safely.
                </p>
            </div>
        </div>
    );
}