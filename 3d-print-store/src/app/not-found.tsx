'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Box, Home, ArrowLeft, Search, Sparkles } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-[#3E312C] font-sans">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-card max-w-md w-full rounded-[28px] border border-[#ECE2D3] bg-[#FFFDF9] p-8 sm:p-10 text-center shadow-xs"
            >
                <div className="w-16 h-16 rounded-[20px] bg-[#FCF8F3] border border-[#ECE2D3] flex items-center justify-center text-[#3F5B43] mx-auto mb-6 shadow-xs">
                    <Box className="w-8 h-8 animate-bounce" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" /> 404 Error
                </div>

                <h1 className="text-3xl font-extrabold text-[#3E312C] tracking-tight mb-2">
                    Page Not Found
                </h1>
                <p className="text-xs sm:text-sm text-[#65554D] leading-relaxed mb-8">
                    The page or 3D creation you are looking for doesn’t exist or may have been relocated in our studio catalog.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="btn-primary py-3 px-5 text-xs font-semibold shadow-md inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                    >
                        <Home className="w-4 h-4" /> Back to Home
                    </Link>
                    <Link
                        href="/products"
                        className="btn-secondary py-3 px-5 text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                        <Search className="w-4 h-4 text-[#3F5B43]" /> Explore Products
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}