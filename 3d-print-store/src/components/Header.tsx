'use client';

import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaShoppingCart, FaHeart, FaBars, FaTimes, FaChevronDown, FaChevronUp, FaPhone, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";

export default function Navbar() {
    const [openProfile, setOpenProfile] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [demandOpen, setDemandOpen] = useState(false);

    const { user } = useAuth?.() || { user: null };
    const cartContext = useCart() || { state: { items: [] } };
    const cartState = cartContext.state || { items: [] };

    const wishlistContext = useWishlist?.();
    const wishlist = wishlistContext?.wishlist || [];

    const profileRef = useRef<HTMLDivElement>(null);
    const mobileProfileRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const cartCount = cartState.items.reduce((sum: number, item: any) => sum + (Number(item.qty) || 1), 0);
    const wishlistCount = wishlist.length;

    useEffect(() => {
        try {
            if (user) sessionStorage.setItem("user", JSON.stringify(user));
            else sessionStorage.removeItem("user");
            sessionStorage.setItem("cart", JSON.stringify(cartState));
        } catch (e) {
            console.warn("Session storage error:", e);
        }
    }, [user, cartState]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setOpenProfile(false);
            }
            if (mobileProfileRef.current && !mobileProfileRef.current.contains(event.target as Node)) {
                setMobileProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const offers = [
        "✨ Flat 10% off on all custom lithophanes!",
        "🚚 Free shipping on orders above ₹199",
        "🎁 Buy 2 Get 1 Free on selected keychains & items",
        "🆕 High-precision resin idols & prints available now!",
    ];

    return (
        <header className="sticky top-0 z-50 text-[#3E312C] font-sans">
            {/* Offers Marquee Bar */}
            <div className="bg-[#FFFDF9]/80 backdrop-blur-md text-[#65554D] py-2 text-xs font-medium overflow-hidden border-b border-[#ECE2D3]">
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-16 animate-marquee whitespace-nowrap">
                        {offers.map((offer, idx) => (
                            <span key={idx} className="flex items-center gap-4 text-[#3E312C]">
                                <span>{offer}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Header Bar */}
            <div className="bg-[#FFFDF9]/90 backdrop-blur-xl border-b border-[#E7DCC8] shadow-sm relative">
                <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-3.5 flex justify-between items-center">

                    {/* Mobile Left Section (Hamburger + Logo) */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={() => {
                                setMobileMenuOpen(prev => !prev);
                                setMobileProfileOpen(false);
                            }}
                            aria-label="Toggle menu"
                            className="p-1.5 text-[#3E312C] hover:text-[#3F5B43] transition-colors cursor-pointer"
                        >
                            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>

                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-1.5 rounded-[12px] bg-[#FCF8F3] border border-[#ECE2D3]">
                                <img src="/logo.png" alt="3dVishwa" className="h-5 w-auto" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                            </div>
                            <span className="text-base font-extrabold tracking-tight text-[#3E312C] uppercase font-sans">
                                3D <span className="text-[#3F5A43]">Vishwa</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Logo */}
                    <Link href="/" className="hidden md:flex items-center gap-2.5 group">
                        <div className="p-2 rounded-[14px] bg-[#FCF8F3] border border-[#ECE2D3] group-hover:scale-105 transition-transform duration-300">
                            <img src="/logo.png" alt="3dVishwa" className="h-6 w-auto" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight text-[#3E312C] uppercase font-sans">
                            3D <span className="text-[#3F5A43]">Vishwa</span>
                        </span>
                    </Link>

                    {/* Mobile Right Section (Cart + Quick Profile Dropdown) */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link href="/cart" className="relative p-2 text-[#3E312C] hover:text-[#3F5B43] transition-colors" aria-label="Cart">
                            <FaShoppingCart className="text-xl" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-[#3F5B43] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Profile Toggle */}
                        <div className="relative" ref={mobileProfileRef}>
                            <button
                                onClick={() => {
                                    setMobileProfileOpen(prev => !prev);
                                    setMobileMenuOpen(false);
                                }}
                                className="p-2 text-[#3E312C] hover:text-[#3F5B43] transition-colors cursor-pointer"
                                aria-label="Account menu"
                            >
                                <FaUserCircle className="text-xl text-[#3F5B43]" />
                            </button>

                            {/* Mobile Profile Dropdown Box */}
                            {mobileProfileOpen && (
                                <div className="absolute right-0 mt-2 w-64 glass-card rounded-[20px] p-3 shadow-lg z-50 bg-[#FFFDF9]/95 backdrop-blur-xl border border-[#ECE2D3]">
                                    {user ? (
                                        <div className="space-y-2">
                                            {/* Logged in User Details */}
                                            <div className="p-3 rounded-[14px] bg-[#FCF8F3] border border-[#ECE2D3]">
                                                <p className="text-xs font-bold text-[#3E312C] truncate">{user.name || "Valued Customer"}</p>
                                                {user.email && (
                                                    <p className="text-[11px] text-[#65554D] flex items-center gap-1.5 mt-1 truncate">
                                                        <FaEnvelope className="text-[10px] text-[#3F5B43] flex-shrink-0" />
                                                        <span className="truncate">{user.email}</span>
                                                    </p>
                                                )}
                                                {user.mobile && (
                                                    <p className="text-[11px] text-[#65554D] flex items-center gap-1.5 mt-1">
                                                        <FaPhone className="text-[10px] text-[#3F5B43] flex-shrink-0" />
                                                        <span>{user.mobile}</span>
                                                    </p>
                                                )}
                                            </div>

                                            {/* Links */}
                                            <div className="pt-1 space-y-1">
                                                <Link
                                                    href="/profile"
                                                    className="block px-3 py-2 text-xs font-semibold text-[#3E312C] hover:bg-[#FCF8F3] rounded-[10px] transition-colors"
                                                    onClick={() => setMobileProfileOpen(false)}
                                                >
                                                    My Profile
                                                </Link>
                                                <Link
                                                    href="/orders"
                                                    className="block px-3 py-2 text-xs font-semibold text-[#3E312C] hover:bg-[#FCF8F3] rounded-[10px] transition-colors"
                                                    onClick={() => setMobileProfileOpen(false)}
                                                >
                                                    My Orders
                                                </Link>
                                                <Link
                                                    href="/wishlist"
                                                    className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#3E312C] hover:bg-[#FCF8F3] rounded-[10px] transition-colors"
                                                    onClick={() => setMobileProfileOpen(false)}
                                                >
                                                    <span>My Wishlist</span>
                                                    {wishlistCount > 0 && (
                                                        <span className="px-2 py-0.5 text-[10px] font-bold bg-[#B8724A] text-white rounded-full">
                                                            {wishlistCount}
                                                        </span>
                                                    )}
                                                </Link>
                                                <Link
                                                    href="/logout"
                                                    className="block px-3 py-2 text-xs font-bold text-[#B8724A] hover:bg-red-50 rounded-[10px] transition-colors"
                                                    onClick={() => setMobileProfileOpen(false)}
                                                >
                                                    Logout
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-2 space-y-2 text-center">
                                            <p className="text-xs text-[#65554D] font-medium mb-1">Access your account & orders</p>
                                            <Link
                                                href="/wishlist"
                                                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#3E312C] hover:bg-[#FCF8F3] rounded-[10px] transition-colors mb-1"
                                                onClick={() => setMobileProfileOpen(false)}
                                            >
                                                <span>My Wishlist</span>
                                                {wishlistCount > 0 && (
                                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#B8724A] text-white rounded-full">
                                                        {wishlistCount}
                                                    </span>
                                                )}
                                            </Link>
                                            <Link
                                                href="/login"
                                                className="btn-primary block py-2.5 px-4 text-xs font-semibold shadow-xs"
                                                onClick={() => setMobileProfileOpen(false)}
                                            >
                                                Login / Signup
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#65554D]">
                        <Link href="/" className="hover:text-[#3E312C] transition-colors">Home</Link>
                        <Link href="/products" className="hover:text-[#3E312C] transition-colors">Products</Link>

                        {/* On Demand Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-[#3E312C] transition-colors py-2 cursor-pointer">
                                On Demand <FaChevronDown className="text-[10px]" />
                            </button>
                            <div className="absolute left-0 mt-0 w-52 glass-card rounded-[20px] py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-200">
                                <Link href="/services/3d-printing" className="block px-4 py-2.5 text-xs font-semibold text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C]">3D Printing</Link>
                                <Link href="/services/3d-scanning" className="block px-4 py-2.5 text-xs font-semibold text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C]">3D Scanning</Link>
                                <Link href="/services/3d-designing" className="block px-4 py-2.5 text-xs font-semibold text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C]">3D Designing & CAD</Link>
                            </div>
                        </div>

                        <Link href="/enquiry" className="hover:text-[#3E312C] transition-colors">Enquiry</Link>

                        {user?.userType === "Admin" && (
                            <Link href="/admin" className="text-[#3F5B43] font-semibold hover:text-[#7B8F63] transition-colors">Admin</Link>
                        )}

                        {/* Cart Icon */}
                        <Link href="/cart" className="relative p-2.5 rounded-[14px] bg-[#FCF8F3] border border-[#ECE2D3] hover:border-[#7B8F63] hover:bg-[#FFFDF9] transition-all text-[#3E312C]" aria-label="Cart">
                            <FaShoppingCart className="text-base" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-[#3F5B43] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Desktop Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setOpenProfile(prev => !prev)}
                                className="p-2.5 rounded-[14px] bg-[#FCF8F3] border border-[#ECE2D3] hover:border-[#7B8F63] hover:bg-[#FFFDF9] transition-all text-[#3E312C] flex items-center justify-center cursor-pointer"
                                aria-label="Profile menu"
                            >
                                <FaUserCircle className="text-lg text-[#3F5B43]" />
                            </button>
                            {openProfile && (
                                <div className="absolute right-0 mt-2 w-56 glass-card rounded-[20px] py-2 z-50">
                                    {user ? (
                                        <>
                                            <div className="px-4 py-2.5 border-b border-[#ECE2D3] mb-1">
                                                <p className="text-xs font-bold text-[#3E312C] truncate">{user.name || "Customer"}</p>
                                                {user.email && <p className="text-[11px] text-[#65554D] truncate">{user.email}</p>}
                                                {user.mobile && <p className="text-[11px] text-[#65554D] truncate">{user.mobile}</p>}
                                            </div>
                                            <Link href="/profile" className="block px-4 py-2 text-xs font-medium text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C]" onClick={() => setOpenProfile(false)}>My Profile</Link>
                                            <Link href="/orders" className="block px-4 py-2 text-xs font-medium text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C]" onClick={() => setOpenProfile(false)}>My Orders</Link>
                                            <Link href="/wishlist" className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C]" onClick={() => setOpenProfile(false)}>
                                                <span>My Wishlist</span>
                                                {wishlistCount > 0 && (
                                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#B8724A] text-white rounded-full">
                                                        {wishlistCount}
                                                    </span>
                                                )}
                                            </Link>
                                            <Link href="/logout" className="block px-4 py-2 text-xs font-semibold text-[#B8724A] hover:bg-[#FCF8F3]" onClick={() => setOpenProfile(false)}>Logout</Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/wishlist" className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C]" onClick={() => setOpenProfile(false)}>
                                                <span>My Wishlist</span>
                                                {wishlistCount > 0 && (
                                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#B8724A] text-white rounded-full">
                                                        {wishlistCount}
                                                    </span>
                                                )}
                                            </Link>
                                            <Link href="/login" className="block px-4 py-2.5 text-xs font-semibold text-[#3F5B43] hover:bg-[#FCF8F3]" onClick={() => setOpenProfile(false)}>Login / Signup</Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

                {/* Mobile Dropdown Menu (Hamburger Links Only) */}
                <div className={`md:hidden bg-[#FFFDF9]/95 backdrop-blur-xl border-t border-[#ECE2D3] transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-[500px]" : "max-h-0"}`}>
                    <nav className="flex flex-col gap-3 p-5 text-[#65554D] text-sm font-medium">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#3E312C]">Home</Link>
                        <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#3E312C]">Products</Link>

                        {/* On Demand Collapsible */}
                        <button
                            onClick={() => setDemandOpen(prev => !prev)}
                            className="flex items-center justify-between text-left py-1 text-[#65554D] cursor-pointer"
                        >
                            <span>On Demand Services</span>
                            {demandOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                        </button>
                        {demandOpen && (
                            <div className="ml-4 flex flex-col gap-2.5 text-xs font-normal text-[#65554D] border-l-2 border-[#7B8F63]/40 pl-3">
                                <Link href="/services/3d-printing" onClick={() => setMobileMenuOpen(false)}>3D Printing</Link>
                                <Link href="/services/3d-scanning" onClick={() => setMobileMenuOpen(false)}>3D Scanning</Link>
                                <Link href="/services/3d-designing" onClick={() => setMobileMenuOpen(false)}>3D Designing & CAD</Link>
                            </div>
                        )}

                        <Link href="/enquiry" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#3E312C]">Enquiry</Link>
                        <Link href="/custom-order" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#3E312C]">Custom Specifications</Link>
                        <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#3E312C]">About Studio</Link>

                        {user?.userType === "Admin" && (
                            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-[#3F5B43] font-semibold">Admin Panel</Link>
                        )}
                    </nav>
                </div>
            </div>

            {/* Marquee Animation Styles */}
            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
        </header>
    );
}