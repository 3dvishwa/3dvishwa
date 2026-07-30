'use client';

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    // Replace with your actual WhatsApp business number (include country code without '+' sign, e.g., 919876543210)
    const phone = "919876543210";
    const message = encodeURIComponent(
        "Hi! I'm interested in ordering a custom 3D print / lithophane and would like to chat about my design."
    );

    return (
        <Link
            href={`https://wa.me/${phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50 group"
        >
            <div className="relative flex h-14 w-14 items-center justify-center">
                {/* Pulse ring animation */}
                <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

                {/* WhatsApp Button Core */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-transform duration-300 group-hover:scale-110">
                    <MessageCircle size={28} />
                </div>
            </div>
        </Link>
    );
}