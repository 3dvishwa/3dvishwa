"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface WishlistItem {
    productId: string;
    name: string;
    pricePaise: number;
    image?: string;
    category?: string;
    size?: string;
    variantId?: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "3dvishwa_wishlist";

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [mounted, setMounted] = useState(false);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (saved) {
                setWishlist(JSON.parse(saved));
            }
        } catch (err) {
            console.warn("Failed to load wishlist from storage", err);
        } finally {
            setMounted(true);
        }
    }, []);

    // Save to localStorage when wishlist changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
        }
    }, [wishlist, mounted]);

    const addToWishlist = (item: WishlistItem) => {
        const exists = wishlist.some((i) => i.productId === item.productId);

        if (exists) {
            toast.error(`${item.name} is already in your wishlist!`);
            return;
        }

        setWishlist((prev) => [...prev, item]);
        toast.success(`${item.name} saved to wishlist!`);
    };

    const removeFromWishlist = (productId: string) => {
        const itemToRemove = wishlist.find((i) => i.productId === productId);

        setWishlist((prev) => prev.filter((i) => i.productId !== productId));

        if (itemToRemove) {
            toast.success(`Removed from wishlist`);
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((i) => i.productId === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};