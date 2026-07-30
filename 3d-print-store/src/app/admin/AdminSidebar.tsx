'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

interface AdminLink {
    href: string;
    label: string;
}

export default function AdminSidebar({ links }: { links: AdminLink[] }) {
    const [openMenu, setOpenMenu] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Desktop Sidebar - Sticky & Fixed Width */}
            <aside className="w-64 shrink-0 h-screen sticky top-0 bg-[#FFFDF9]/90 backdrop-blur-md border-r border-[#ECE2D3] hidden md:flex flex-col z-30">
                <div className="p-6 border-b border-[#ECE2D3] flex items-center gap-2.5">
                    <div className="p-2 rounded-[12px] bg-[#FCF8F3] border border-[#ECE2D3] text-[#3F5B43]">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-base tracking-tight text-[#3E312C]">
                        Admin Panel
                    </span>
                </div>

                <nav className="p-4 flex flex-col gap-1.5 overflow-y-auto flex-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-3 rounded-[14px] text-xs font-semibold transition-all duration-150 ${isActive
                                        ? "bg-[#3F5B43] text-white shadow-sm"
                                        : "text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C] hover:border hover:border-[#ECE2D3]"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Header Bar */}
            <div className="md:hidden w-full bg-[#FFFDF9]/95 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-[#ECE2D3] fixed top-0 left-0 z-40 shadow-sm">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#3F5B43]" />
                    <span className="font-extrabold text-sm text-[#3E312C]">Admin Panel</span>
                </div>
                <button
                    onClick={() => setOpenMenu(!openMenu)}
                    className="p-2 border border-[#ECE2D3] rounded-[12px] text-xs font-semibold text-[#3E312C] bg-[#FCF8F3] hover:bg-[#FFFDF9] transition cursor-pointer"
                    aria-label="Toggle Navigation Menu"
                >
                    {openMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu with Backdrop */}
            {openMenu && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 bg-[#3E312C]/20 backdrop-blur-xs z-30"
                        onClick={() => setOpenMenu(false)}
                    />

                    {/* Menu Drawer */}
                    <div className="md:hidden fixed top-[57px] left-0 w-full bg-[#FFFDF9] shadow-lg z-40 p-4 flex flex-col gap-2 border-b border-[#ECE2D3]">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpenMenu(false)}
                                    className={`px-4 py-3 rounded-[14px] text-xs font-semibold transition-colors duration-150 ${isActive
                                            ? "bg-[#3F5B43] text-white"
                                            : "text-[#65554D] hover:bg-[#FCF8F3] hover:text-[#3E312C]"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
}