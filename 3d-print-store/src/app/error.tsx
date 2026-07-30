'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Unhandled app error:', error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 text-[#3E312C] font-sans">
            <div className="glass-card max-w-md w-full rounded-[28px] border border-[#ECE2D3] bg-[#FFFDF9] p-8 sm:p-10 text-center shadow-xs">
                <div className="w-16 h-16 rounded-[20px] bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mx-auto mb-5 shadow-xs">
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-extrabold text-[#3E312C] tracking-tight mb-2">
                    Something went wrong!
                </h1>
                <p className="text-xs sm:text-sm text-[#65554D] leading-relaxed mb-6">
                    An unexpected error occurred while processing your request. Please try again or return to the main store.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => reset()}
                        className="btn-primary py-3 px-5 text-xs font-semibold shadow-md inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                    >
                        <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                    <Link
                        href="/"
                        className="btn-secondary py-3 px-5 text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                        <Home className="w-4 h-4 text-[#3F5B43]" /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}