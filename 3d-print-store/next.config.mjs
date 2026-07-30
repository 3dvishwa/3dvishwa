import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Top-level turbopack config in Next.js 16+
    turbopack: {
        root: __dirname,
    },

    // Remote image patterns configuration
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

    // Subdomain CORS headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'https://software.3dvishwa.com',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;