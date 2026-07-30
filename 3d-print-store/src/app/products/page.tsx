"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Package, Plus, Heart, Search, Filter, ArrowUpRight } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import toast, { Toaster } from "react-hot-toast";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ProductsContent() {
    const cartContext = useCart();
    const addItem = cartContext?.addItem || cartContext?.addToCart;

    // Wishlist context hook integration
    const wishlistContext = useWishlist?.();
    const addToWishlist = wishlistContext?.addToWishlist;
    const removeFromWishlist = wishlistContext?.removeFromWishlist;
    const isInWishlist = wishlistContext?.isInWishlist;

    const router = useRouter();

    const { data, error, isLoading } = useSWR("/api/admin/products", fetcher);

    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get("category");

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (categoryQuery) {
            setSelectedCategory(categoryQuery);
        } else {
            setSelectedCategory("All");
        }
    }, [categoryQuery]);

    const products = useMemo(() => data?.products || [], [data]);

    // Extract all unique categories
    const categories = useMemo(() => {
        const catSet = new Set<string>();
        products.forEach((p: any) => {
            if (p.category) catSet.add(p.category);
        });
        return ["All", ...Array.from(catSet).sort()];
    }, [products]);

    // Filter products based on search query & category
    const filteredProducts = useMemo(() => {
        return products.filter((p: any) => {
            const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
            const searchLower = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !searchLower ||
                p.name?.toLowerCase().includes(searchLower) ||
                (typeof p.description === "string" && p.description.toLowerCase().includes(searchLower)) ||
                (typeof p.description === "object" && JSON.stringify(p.description).toLowerCase().includes(searchLower));

            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchQuery]);

    // Group filtered products by category
    const groupedByCategory = useMemo(() => {
        return filteredProducts.reduce((acc: any, product: any) => {
            const cat = product.category || "Uncategorized";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(product);
            return acc;
        }, {});
    }, [filteredProducts]);

    const activeCategories = Object.keys(groupedByCategory).sort();

    if (error) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center px-4" role="alert">
                <div className="p-8 glass-card rounded-[24px] border border-[#ECE2D3] text-[#B8724A] text-center max-w-md shadow-sm">
                    <p className="font-bold text-base mb-2">Failed to load catalog</p>
                    <p className="text-xs text-[#65554D]">{error.message || "An unexpected error occurred."}</p>
                </div>
            </div>
        );
    }

    return (
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-sans text-[#3E312C]">
            <Toaster position="top-right" />

            {/* Header Showcase Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-[#ECE2D3] pb-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-[#3F5B43]" /> Catalog Showcase
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3E312C] tracking-tight">
                        Explore Our <span className="text-[#3F5A43]">3D Prints</span>
                    </h1>
                    <p className="text-[#65554D] text-xs sm:text-sm mt-2 max-w-xl">
                        Discover custom lithophanes, keychains, divine idols, and precision engineering prints handcrafted with care.
                    </p>
                </div>

                {/* Live Search Input */}
                <div className="w-full md:w-80 relative">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search creations..."
                        className="w-full pl-11 pr-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all shadow-xs"
                    />
                </div>
            </div>

            {/* Category Filter Pill Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
                <span className="text-xs font-bold text-[#65554D] uppercase tracking-wider flex items-center gap-1.5 shrink-0 mr-2">
                    <Filter className="w-3.5 h-3.5 text-[#3F5B43]" /> Filter:
                </span>
                {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                if (cat === "All") {
                                    router.push("/products");
                                } else {
                                    router.push(`/products?category=${encodeURIComponent(cat)}`);
                                }
                            }}
                            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${isActive
                                ? "bg-[#3F5B43] text-white shadow-sm"
                                : "bg-[#FFFDF9] text-[#65554D] border border-[#ECE2D3] hover:border-[#7B8F63] hover:text-[#3E312C]"
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Loading Skeleton */}
            {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="glass-card rounded-[20px] p-4 h-[380px] sm:h-[420px] animate-pulse space-y-4">
                            <div className="w-full h-44 bg-[#ECE2D3]/40 rounded-[14px]" />
                            <div className="h-4 bg-[#ECE2D3]/60 rounded w-3/4" />
                            <div className="h-3 bg-[#ECE2D3]/40 rounded w-1/2" />
                            <div className="h-8 bg-[#ECE2D3]/50 rounded-[12px] mt-auto" />
                        </div>
                    ))}
                </div>
            )}

            {/* Products Grouped by Categories */}
            {!isLoading && activeCategories.map((category, catIdx) => (
                <section key={category} className="mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIdx * 0.08 }}
                        className="flex items-center justify-between mb-6 pb-2 border-b border-[#ECE2D3]/60"
                    >
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#3E312C] flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#3F5B43]" />
                            {category}
                        </h2>
                        <span className="text-xs font-semibold text-[#65554D] bg-[#FCF8F3] border border-[#ECE2D3] px-3 py-1 rounded-full">
                            {groupedByCategory[category].length} {groupedByCategory[category].length === 1 ? "Item" : "Items"}
                        </span>
                    </motion.div>

                    <ul
                        role="list"
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6"
                    >
                        {groupedByCategory[category]?.map((product: any, idx: number) => {
                            const minPricePaise = Math.min(
                                ...(product.variants?.map((v: any) => v.pricePaise) || [0])
                            );
                            const defaultVariant = product.variants?.[0];

                            const isSaved = isInWishlist ? isInWishlist(product.productId) : false;

                            const descriptionText =
                                typeof product.description === "string"
                                    ? product.description
                                    : typeof product.description === "object"
                                        ? product.description?.about ||
                                        product.description?.productInfo ||
                                        "High-precision 3D printed creation."
                                        : "High-precision 3D printed creation.";

                            const handleAddToCart = (e: React.MouseEvent) => {
                                e.preventDefault();
                                e.stopPropagation();

                                if (!defaultVariant) {
                                    toast.error("No variant available for this product");
                                    return;
                                }

                                if (addItem) {
                                    addItem({
                                        productId: product.productId,
                                        name: product.name,
                                        pricePaise: defaultVariant.pricePaise,
                                        qty: 1,
                                        variantId: defaultVariant.variantId || 'default',
                                        size: defaultVariant.size || '',
                                        images: product.images || ['/placeholder.png'],
                                    });
                                    toast.success(`${product.name} added to cart!`);
                                }
                            };

                            const handleToggleWishlist = (e: React.MouseEvent) => {
                                e.preventDefault();
                                e.stopPropagation();

                                if (!addToWishlist || !removeFromWishlist) {
                                    toast.success(isSaved ? "Removed from wishlist!" : "Saved to wishlist!");
                                    return;
                                }

                                if (isSaved) {
                                    removeFromWishlist(product.productId);
                                } else {
                                    addToWishlist({
                                        productId: product.productId,
                                        name: product.name,
                                        pricePaise: defaultVariant?.pricePaise || minPricePaise || 0,
                                        image: product.images?.[0] || "/placeholder.png",
                                        category: product.category,
                                    });
                                }
                            };

                            return (
                                <motion.li
                                    key={product.productId}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                >
                                    <div className="glass-card organic-hover rounded-[20px] border border-[#ECE2D3] overflow-hidden transition-all duration-300 flex flex-col justify-between h-auto group bg-[#FFFDF9]/90 relative shadow-xs">

                                        {/* Image Container & Floating Wishlist Icon */}
                                        <div className="relative w-full aspect-square bg-[#FCF8F3] overflow-hidden p-3 border-b border-[#ECE2D3]/60">
                                            <Link href={`/products/${product.productId}`} className="block relative w-full h-full">
                                                <Image
                                                    src={product.images?.[0] || "/placeholder.png"}
                                                    alt={product.name || "Product image"}
                                                    fill
                                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
                                                />
                                            </Link>

                                            {/* Top-Right Wishlist Action */}
                                            <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20">
                                                <button
                                                    type="button"
                                                    aria-label={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                                                    className={`w-8 h-8 rounded-full border border-[#ECE2D3] flex items-center justify-center transition-all shadow-xs cursor-pointer ${isSaved
                                                            ? "bg-red-50 text-red-500 border-red-200"
                                                            : "bg-[#FFFDF9]/90 text-[#3E312C] hover:text-[#B8724A] hover:bg-white"
                                                        }`}
                                                    onClick={handleToggleWishlist}
                                                >
                                                    <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                                                </button>
                                            </div>

                                            {/* Desktop-Only Hover Overlay Button */}
                                            <div className="hidden sm:block absolute inset-x-2.5 bottom-2.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
                                                <button
                                                    type="button"
                                                    onClick={handleAddToCart}
                                                    className="btn-primary w-full py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    <span>Add to Cart</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content Section - Compact Layout */}
                                        <div className="p-3.5 sm:p-4 flex flex-col gap-2.5">
                                            <div>
                                                <Link href={`/products/${product.productId}`} className="group/link flex items-start justify-between gap-1 mb-1">
                                                    <h3
                                                        className="text-xs sm:text-sm font-bold text-[#3E312C] line-clamp-1 group-hover/link:text-[#3F5B43] transition-colors"
                                                        title={product.name}
                                                    >
                                                        {product.name}
                                                    </h3>
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-[#65554D] opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0 mt-0.5 hidden sm:block" />
                                                </Link>

                                                {/* Exactly 3 Lines of Description with Ellipsis */}
                                                <p
                                                    className="text-[11px] text-[#65554D] line-clamp-3 leading-relaxed"
                                                    title={descriptionText}
                                                >
                                                    {descriptionText}
                                                </p>
                                            </div>

                                            {/* Bottom Price & Mobile Quick Add Row with short gap */}
                                            <div className="flex items-center justify-between pt-2 border-t border-[#ECE2D3]">
                                                <div>
                                                    <span className="text-[9px] sm:text-[10px] font-bold text-[#65554D] uppercase tracking-wider block">Starts at</span>
                                                    <span className="text-[#3E312C] font-extrabold text-xs sm:text-sm">
                                                        ₹{(minPricePaise / 100).toLocaleString("en-IN")}
                                                    </span>
                                                </div>

                                                {/* Mobile-Only Touch Add to Cart Button */}
                                                <button
                                                    type="button"
                                                    onClick={handleAddToCart}
                                                    aria-label={`Add ${product.name} to cart`}
                                                    className="sm:hidden p-2 rounded-full bg-[#3F5B43] text-white shadow-xs active:scale-90 transition-transform cursor-pointer flex items-center justify-center"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </motion.li>
                            );
                        })}
                    </ul>
                </section>
            ))}

            {/* Empty State */}
            {!isLoading && activeCategories.length === 0 && (
                <div className="glass-card rounded-[24px] border border-[#ECE2D3] p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
                    <div className="w-14 h-14 rounded-full bg-[#FCF8F3] border border-[#ECE2D3] flex items-center justify-center mx-auto text-[#3F5B43]">
                        <Package className="w-7 h-7" />
                    </div>
                    <h3 className="text-[#3E312C] font-bold text-lg">No creations found</h3>
                    <p className="text-[#65554D] text-xs leading-relaxed">
                        No products match your query "{searchQuery}". Try searching for something else or reset your category filter.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("All");
                            router.push("/products");
                        }}
                        className="btn-secondary py-2.5 px-5 text-xs font-semibold cursor-pointer"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}
        </main>
    );
}

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <p className="text-[#65554D] text-sm font-medium animate-pulse">Loading products catalog...</p>
                </div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}