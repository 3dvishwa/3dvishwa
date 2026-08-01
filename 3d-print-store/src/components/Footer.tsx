'use client';

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const CREATIONS = [
    "Lithophanes",
    "Keychains",
    "Divine Idols",
    "Engineering Prototypes",
    "Resin Sculptures",
    "Custom CAD Models",
];

export default function Footer() {
    const softwareSiteUrl = "https://techworks.3dvishwa.com/";
    return (
        <footer className="w-full bg-[#F7F2EB]/90 border-t border-[#E7DCC8] text-[#65554D] font-sans mt-24 relative z-10">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-16 pb-12">

                {/* SEO SERVICES / POPULAR CATEGORIES CHIPS */}
                <div className="mb-12 pb-8 border-b border-[#ECE2D3]">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#3E312C] mb-5 text-center md:text-left">
                        Popular Custom 3D Printing Services
                    </h4>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                        {CREATIONS.map((item) => (
                            <Link
                                key={item}
                                href="/custom-order"
                                className="px-4 py-2 rounded-full bg-[#FFFDF9] border border-[#ECE2D3] text-xs font-semibold text-[#3E312C] hover:border-[#3F5B43] hover:bg-[#3F5B43] hover:text-white transition-all shadow-sm"
                            >
                                Custom {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* PRICING & SPEED HIGHLIGHT BANNER */}
                <div className="text-center bg-[#FFFDF9]/60 border border-[#ECE2D3] rounded-[20px] p-4 mb-14 max-w-3xl mx-auto shadow-xs">
                    <p className="text-xs sm:text-sm font-medium text-[#65554D]">
                        High-precision custom prints starting at{" "}
                        <span className="font-extrabold text-[#3F5B43]">₹499</span> with fast turnaround times and expert CAD design support.
                    </p>
                </div>

                {/* MAIN FOOTER GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">

                    {/* BRAND & CONTACT */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2.5 group">
                            <div className="p-2 rounded-[14px] bg-[#FFFDF9] border border-[#ECE2D3] group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src="/logo.png"
                                    alt="3D Vishwa Logo"
                                    width={24}
                                    height={24}
                                    className="object-contain h-6 w-auto"
                                />
                            </div>
                            <span className="font-extrabold text-lg tracking-tight text-[#3E312C] uppercase font-sans">
                                3D <span className="text-[#3F5A43]">Vishwa</span>
                            </span>
                        </Link>

                        <p className="text-[#65554D] text-xs leading-relaxed">
                            Your trusted 3d Printing Studio for <strong className="text-[#3E312C]">custom lithophanes, personalized keychains, and intricate resin idols</strong>. We transform your digital photos and ideas into physical reality.
                        </p>

                        <div className="space-y-1.5 text-xs pt-1">
                            <a href="mailto:info.3dvishwa@gmail.com" className="block font-semibold text-[#3E312C] hover:text-[#3F5B43] transition-colors">
                                info.3dvishwa@gmail.com
                            </a>
                            <a href="tel:+917276209570" className="block font-semibold text-[#3E312C] hover:text-[#3F5B43] transition-colors">
                                +91 7276209570
                            </a>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-2.5 pt-2">
                            <a
                                href="https://www.instagram.com/3d_vishwa"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="p-2.5 rounded-full bg-[#FFFDF9] border border-[#ECE2D3] text-[#3E312C] hover:border-[#7B8F63] hover:text-[#3F5B43] transition-all shadow-xs"
                            >
                                <FaInstagram className="text-base" />
                            </a>
                            <a
                                href="https://wa.me/917276209570"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="p-2.5 rounded-full bg-[#FFFDF9] border border-[#ECE2D3] text-[#3E312C] hover:border-[#3F5B43] hover:text-[#3F5B43] transition-all shadow-xs"
                            >
                                <FaWhatsapp className="text-base" />
                            </a>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h4 className="font-bold text-[#3E312C] mb-5 text-xs uppercase tracking-widest">
                            Quick Links
                        </h4>

                        <ul className="space-y-2.5 text-xs text-[#65554D]">
                            <li>
                                <Link href="/" className="hover:text-[#3E312C] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-[#3E312C] transition-colors">
                                    Products Catalog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="hover:text-[#3E312C] transition-colors">
                                    About Our Studio
                                </Link>
                            </li>
                            <li>
                                <Link href="/enquiry" className="hover:text-[#3E312C] transition-colors">
                                    Contact & Enquiries
                                </Link>
                            </li>
                            <li>
                                <Link href="/custom-order" className="hover:text-[#3E312C] transition-colors">
                                    Custom Order Specification
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* GUIDES & POLICIES */}
                    <div>
                        <h4 className="font-bold text-[#3E312C] mb-5 text-xs uppercase tracking-widest">
                            Information
                        </h4>

                        <ul className="space-y-2.5 text-xs text-[#65554D]">
                            <li>
                                <Link href="/info/faqs" className="hover:text-[#3E312C] transition-colors">
                                    Frequently Asked Questions
                                </Link>
                            </li>
                            <li>
                                <Link href="/info/cancellation" className="hover:text-[#3E312C] transition-colors">
                                    Cancellation & Refund
                                </Link>
                            </li>
                            <li>
                                <Link href="/info/shipping" className="hover:text-[#3E312C] transition-colors">
                                    Shipping & Delivery
                                </Link>
                            </li>
                            <li>
                                <Link href="/info/privacy" className="hover:text-[#3E312C] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/info/terms" className="hover:text-[#3E312C] transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ON DEMAND SERVICES & ADDRESS */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-[#3E312C] mb-4 text-xs uppercase tracking-widest">
                                On Demand Services
                            </h4>
                            <ul className="space-y-2.5 text-xs text-[#65554D]">
                                <li>
                                    <Link href="/services/3d-printing" className="hover:text-[#3E312C] transition-colors">
                                        3D Printing Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services/3d-scanning" className="hover:text-[#3E312C] transition-colors">
                                        3D Scanning Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services/3d-designing" className="hover:text-[#3E312C] transition-colors">
                                        3D Designing & CAD
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#3E312C] mb-2 text-xs uppercase tracking-widest">
                                Studio Address
                            </h4>
                            <p className="leading-relaxed text-[#65554D] text-xs">
                                Kashid Nagar, Pimple Gurav,<br />
                                Pune, Maharashtra 411061, India
                            </p>
                        </div>
                    </div>

                </div>

                {/* BOTTOM COPYRIGHT & CREDITS BAR */}
                <div className="mt-14 pt-6 border-t border-[#ECE2D3] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-xs text-[#65554D] font-medium order-1 md:order-1">
                        &copy; {new Date().getFullYear()} 3DVishwa. All rights reserved.
                    </p>

                    {/* Software Solutions Credit */}
                    <p className="text-xs text-[#65554D] font-medium order-3 md:order-2">
                        Designed & Developed by{" "}
                        <a
                            href={softwareSiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-[#3F5B43] hover:text-[#7B8F63] underline underline-offset-2 transition-colors"
                        >
                            3dVishwa Software Solutions
                        </a>
                    </p>
                    https://techworks.3dvishwa.com/
                    <div className="flex items-center gap-2 bg-[#FFFDF9] px-3 py-1.5 rounded-full border border-[#ECE2D3] order-2 md:order-3">
                        <img
                            src="/images/Home/Footer/Make-In-India.webp"
                            alt="Make in India"
                            className="h-5 opacity-90"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                        <span className="italic font-serif font-bold tracking-wide text-[#3E312C] text-[11px]">
                            Make in India
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}