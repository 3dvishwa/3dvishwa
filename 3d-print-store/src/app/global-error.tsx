'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global application error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-[#FFFDF9] text-[#3E312C] min-h-screen flex items-center justify-center px-4 font-sans">
                <div className="p-8 sm:p-10 rounded-[28px] border border-[#ECE2D3] bg-[#FFFDF9] text-center max-w-md shadow-md space-y-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto font-bold text-xl">
                        !
                    </div>
                    <h1 className="text-2xl font-extrabold">Application Error</h1>
                    <p className="text-xs text-[#65554D] leading-relaxed">
                        A critical system error occurred. Please refresh the page to reload the application.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="w-full py-3 px-5 rounded-[16px] bg-[#3F5B43] text-white text-xs font-bold shadow-sm hover:bg-[#324A36] transition cursor-pointer"
                    >
                        Reload Studio Application
                    </button>
                </div>
            </body>
        </html>
    );
}