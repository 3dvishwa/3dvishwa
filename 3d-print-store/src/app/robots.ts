import type { MetadataRoute } from "next";

const SITE_URL = "https://store.3dvishwa.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin/",
                    "/api/",
                    "/login",
                    "/logout",
                    "/cart",
                    "/profile",
                    "/orders",
                    "/wishlist",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
