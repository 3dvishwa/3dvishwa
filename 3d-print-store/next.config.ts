import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Allow local Wi-Fi IP testing in development
    allowedDevOrigins: [
        "192.168.31.207",
        "192.168.31.207:3010",
        "localhost:3010",
        "*.3dvishwa.com",
    ],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ],
    },
};

export default nextConfig;