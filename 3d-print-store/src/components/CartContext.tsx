"use client";

import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

const CartContext = createContext<any>(null);

const initialState = {
    items: [],
};

function cartReducer(state: any, action: any) {
    switch (action.type) {
        case "ADD_ITEM": {
            const newItem = action.payload;
            const pricePaise = Number(newItem.pricePaise) || 0;
            const normalizedItem = { ...newItem, pricePaise };

            const existing = state.items.find(
                (i: any) =>
                    i.productId === normalizedItem.productId &&
                    i.variantId === normalizedItem.variantId
            );

            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i: any) =>
                        i.productId === normalizedItem.productId &&
                            i.variantId === normalizedItem.variantId
                            ? { ...i, qty: i.qty + normalizedItem.qty }
                            : i
                    ),
                };
            }

            return { ...state, items: [...state.items, normalizedItem] };
        }

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    (i: any) =>
                        !(
                            i.productId === action.payload.productId &&
                            i.variantId === action.payload.variantId
                        )
                ),
            };

        case "UPDATE_QTY":
            return {
                ...state,
                items: state.items.map((i: any) =>
                    i.productId === action.payload.productId &&
                        i.variantId === action.payload.variantId
                        ? { ...i, qty: action.payload.qty }
                        : i
                ),
            };

        case "CLEAR_CART":
            return { ...state, items: [] };

        default:
            return state;
    }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [hydrated, setHydrated] = useState(false);

    // Load cart from localStorage after hydration
    useEffect(() => {
        try {
            const stored = localStorage.getItem("cart");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.items) {
                    dispatch({ type: "CLEAR_CART" });
                    parsed.items.forEach((item: any) =>
                        dispatch({ type: "ADD_ITEM", payload: item })
                    );
                }
            }
        } catch (err) {
            console.error("Failed to load cart:", err);
        }
        setHydrated(true);
    }, []);

    // Persist cart to localStorage on changes
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem("cart", JSON.stringify(state));
        }
    }, [state, hydrated]);

    // Listen to auth state changes to clear cart on logout
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                dispatch({ type: "CLEAR_CART" });
            }
        });

        return () => unsubscribe();
    }, []);

    const addItem = (item: any) => dispatch({ type: "ADD_ITEM", payload: item });
    const removeItem = (productId: string, variantId: string) =>
        dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
    const updateQty = (productId: string, variantId: string, qty: number) =>
        dispatch({ type: "UPDATE_QTY", payload: { productId, variantId, qty } });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    return (
        <CartContext.Provider
            value={{ state, addItem, removeItem, updateQty, clearCart, hydrated }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}