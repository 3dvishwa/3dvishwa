export function LogoLayeredCube({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Base Layer - Cyan 3D Base */}
            <path
                d="M50 88L15 68V42L50 62L85 42V68L50 88Z"
                fill="url(#cyan-grad)"
                fillOpacity="0.25"
                stroke="#22D3EE"
                strokeWidth="2"
            />
            {/* Mid Layer - Glassmorphic Interface */}
            <path
                d="M50 70L25 55V38L50 53L75 38V55L50 70Z"
                fill="url(#slate-glass)"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="1.5"
            />
            {/* Top Floating Layer - TechWorks Violet Accent */}
            <path
                d="M50 48L20 32L50 16L80 32L50 48Z"
                fill="url(#violet-grad)"
                stroke="#7C3AED"
                strokeWidth="2.5"
            />

            {/* Gradients */}
            <defs>
                <linearGradient id="cyan-grad" x1="15" y1="42" x2="85" y2="88" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22D3EE" />
                    <stop offset="1" stopColor="#0891B2" />
                </linearGradient>
                <linearGradient id="violet-grad" x1="20" y1="16" x2="80" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A78BFA" />
                    <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="slate-glass" x1="25" y1="38" x2="75" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.05" />
                </linearGradient>
            </defs>
        </svg>
    );
}