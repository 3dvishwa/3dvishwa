"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Trash2,
    ShoppingCart,
    ArrowLeft,
    Sparkles,
    ShoppingBag,
    ArrowUpRight
} from "lucide-react";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/components/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const cartContext = useCart();
    const addItem = cartContext?.addItem || cartContext?.addToCart;

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-[#65554D] text-sm font-semibold animate-pulse">
                    Loading your saved creations...
                </p>
            </div>
        );
    }

    const handleMoveToCart = (item: any) => {
        if (addItem) {
            addItem({
                productId: item.productId,
                name: item.name,
                pricePaise: item.pricePaise,
                qty: 1,
                variantId: item.variantId || "default",
                size: item.size || "",
                images: item.image ? [item.image] : ["/placeholder.png"],
            });
            toast.success(`${item.name} moved to cart!`);
            removeFromWishlist(item.productId);
        }
    };

    return (
        <div className="max-w-[1280px] mx-auto py-8 sm:py-12 px-4 sm:px-6 text-[#3E312C] font-sans">
            <Toaster position="top-right" />

            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 border-b border-[#ECE2D3] pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> Saved Favorites
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">
                        My Wishlist
                    </h1>
                    <p className="text-xs sm:text-sm text-[#65554D] mt-1">
                        Keep track of your favorite custom 3D prints, lithophanes, and figures.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {wishlist.length > 0 && (
                        <button
                            onClick={clearWishlist}
                            className="px-4 py-2.5 rounded-[14px] text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition flex items-center gap-1.5 cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5" /> Clear Wishlist
                        </button>
                    )}
                    <Link
                        href="/products"
                        className="btn-secondary inline-flex items-center gap-2 text-xs font-bold py-2.5 px-4"
                    >
                        <ArrowLeft className="w-4 h-4" /> Explore Catalog
                    </Link>
                </div>
            </div>

            {!wishlist.length ? (
                /* Empty Wishlist State */
                <div className="glass-card rounded-[28px] border border-[#ECE2D3] p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs bg-[#FFFDF9]">
                    <div className="w-16 h-16 bg-[#FCF8F3] border border-[#ECE2D3] rounded-[22px] flex items-center justify-center text-[#3F5B43] mx-auto shadow-xs">
                        <Heart className="w-8 h-8 text-[#B8724A]" />
                    </div>
                    <h2 className="text-xl font-extrabold text-[#3E312C]">Your Wishlist is Empty</h2>
                    <p className="text-[#65554D] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                        You haven't saved any creations yet. Browse our catalog of custom lithophanes, idols, and keychains to save your favorites!
                    </p>
                    <Link
                        href="/products"
                        className="btn-primary inline-block font-semibold text-xs sm:text-sm py-3 px-6 shadow-md cursor-pointer active:scale-95"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                /* Wishlist Grid */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
                    <AnimatePresence>
                        {wishlist.map((item) => (
                            <motion.div
                                key={item.productId}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="glass-card organic-hover rounded-[20px] border border-[#ECE2D3] overflow-hidden flex flex-col justify-between h-full bg-[#FFFDF9]/90 relative shadow-xs group">

                                    {/* Image Container & Top Action */}
                                    <div className="relative w-full aspect-square bg-[#FCF8F3] p-3 border-b border-[#ECE2D3]/60">
                                        <Link href={`/products/${item.productId}`} className="block relative w-full h-full">
                                            <Image
                                                src={item.image || "/placeholder.png"}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                                className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>

                                        {/* Delete from Wishlist Icon */}
                                        <button
                                            onClick={() => removeFromWishlist(item.productId)}
                                            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-[#FFFDF9]/90 border border-[#ECE2D3] text-red-500 hover:bg-red-50 transition shadow-xs cursor-pointer"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Product Details & Actions */}
                                    <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between space-y-3">
                                        <div>
                                            {item.category && (
                                                <span className="text-[10px] font-bold text-[#7B8F63] uppercase tracking-wider block mb-1">
                                                    {item.category}
                                                </span>
                                            )}
                                            <Link href={`/products/${item.productId}`} className="group/title flex items-start justify-between gap-1">
                                                <h3 className="text-xs sm:text-sm font-bold text-[#3E312C] line-clamp-2 group-hover/title:text-[#3F5B43] transition-colors">
                                                    {item.name}
                                                </h3>
                                                <ArrowUpRight className="w-3.5 h-3.5 text-[#65554D] opacity-0 group-hover/title:opacity-100 transition-opacity shrink-0" />
                                            </Link>
                                        </div>

                                        <div className="pt-2 border-t border-[#ECE2D3] space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-[#65554D] uppercase tracking-wider">Price</span>
                                                <span className="text-[#3E312C] font-extrabold text-xs sm:text-sm">
                                                    ₹{((item.pricePaise || 0) / 100).toLocaleString("en-IN")}
                                                </span>
                                            </div>

                                            {/* Move to Cart Button */}
                                            <button
                                                onClick={() => handleMoveToCart(item)}
                                                className="btn-primary w-full py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-all"
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5" />
                                                <span>Move to Cart</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}