import React from 'react';

interface ProductJsonLdProps {
    product: any;
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
    if (!product) return null;

    const firstVariant = product.variants?.[0];
    const price = firstVariant ? (firstVariant.pricePaise || 0) / 100 : 0;

    const images = (product.images || []).map((p: string) =>
        p.startsWith('http') ? p : `https://3dvishwa.com${p}`
    );

    const ld = {
        "@context": "https://schema.org",
        "@type": "Product",
        "sku": product.productId,
        "name": product.name,
        "description": (product.description?.about || "").replace(/<[^>]+>/g, ""),
        "image": images,
        "brand": {
            "@type": "Brand",
            "name": product.description?.brandInfo?.["Brand Name"] || "3dVishwa"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://3dvishwa.com/products/${product.productId}`,
            "priceCurrency": "INR",
            "price": price.toFixed(2),
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
            key="product-jsonld"
        />
    );
}