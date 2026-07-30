'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
    user: any;
    cart: any[];
    addToCart: (item: any) => void;
    removeFromCart: (id: string) => void;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Load user and cart from sessionStorage on first mount
    useEffect(() => {
        let isMounted = true;

        // Restore user
        const cachedUserRaw = sessionStorage.getItem("user");
        if (cachedUserRaw) {
            try {
                const cachedUser = JSON.parse(cachedUserRaw);
                setUser(cachedUser);
            } catch {
                sessionStorage.removeItem("user");
            }
        }

        // Restore cart
        const cachedCartRaw = sessionStorage.getItem("cart");
        if (cachedCartRaw) {
            try {
                const cachedCart = JSON.parse(cachedCartRaw);
                setCart(cachedCart);
            } catch {
                sessionStorage.removeItem("cart");
            }
        }

        // Firebase auth state listener
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!isMounted) return;

            if (firebaseUser) {
                try {
                    const ref = doc(db, "users", firebaseUser.uid);
                    const snap = await getDoc(ref);
                    const freshUser = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        userType: "Customer", // Default fallback
                        ...(snap.exists() ? snap.data() : {})
                    };
                    setUser(freshUser);
                    sessionStorage.setItem("user", JSON.stringify(freshUser));
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                    setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
                }
            } else {
                setUser(null);
                setCart([]);
                clearSessionData();
            }

            setLoading(false);
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    // Sync cart to sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // --- Cart Manipulation ---
    const addToCart = (item: any) => {
        setCart((prev) => [...prev, item]);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.id !== id && i.productId !== id));
    };

    // --- Session Cleanup ---
    const clearSessionData = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("addresses");
        sessionStorage.removeItem("cart");
    };

    // --- Logout ---
    const logout = async () => {
        clearSessionData();
        await signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                cart,
                addToCart,
                removeFromCart,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};