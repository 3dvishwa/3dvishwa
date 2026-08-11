import type { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";

const SITE_URL = "https://store.3dvishwa.com";

type Product = {
    productId: string;
    name?: string;
    images?: string[];
    updatedAt?: string;
};

type Catalog = {
    products: Product[];
};

async function getCatalog(): Promise<Catalog> {
    const filePath = path.join(process.cwd(), "public", "catalog.json");

    const file = await fs.readFile(filePath, "utf-8");

    return JSON.parse(file);
}

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const catalog = await getCatalog();

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
        },
        {
            url: `${SITE_URL}/products`,
        },
        {
            url: `${SITE_URL}/about-us`,
        },
        {
            url: `${SITE_URL}/custom-order`,
        },
        {
            url: `${SITE_URL}/enquiry`,
        },
        {
            url: `${SITE_URL}/services/3d-printing`,
        },
        {
            url: `${SITE_URL}/services/3d-designing`,
        },
        {
            url: `${SITE_URL}/services/3d-scanning`,
        },
        {
            url: `${SITE_URL}/info/faqs`,
        },
        {
            url: `${SITE_URL}/info/shipping`,
        },
        {
            url: `${SITE_URL}/info/cancellation`,
        },
        {
            url: `${SITE_URL}/info/privacy`,
        },
        {
            url: `${SITE_URL}/info/terms`,
        },
    ];

    const productPages: MetadataRoute.Sitemap = catalog.products
        .filter((product) => product.productId)
        .map((product) => ({
            url: `${SITE_URL}/products/${encodeURIComponent(product.productId)}`,

            ...(product.updatedAt
                ? {
                    lastModified: new Date(product.updatedAt),
                }
                : {}),

            images: product.images
                ?.filter(Boolean)
                .map((image) => {
                    if (image.startsWith("http://") || image.startsWith("https://")) {
                        return image;
                    }

                    return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`
                        }`;
                }),
        }));

    return [...staticPages, ...productPages];
}