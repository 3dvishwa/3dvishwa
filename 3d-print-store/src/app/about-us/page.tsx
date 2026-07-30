"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Zap, HeartHandshake, Leaf } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
        }),
    };

    return (
        <main className="max-w-[1400px] mx-auto space-y-20 py-8 font-sans text-[#3E312C]">
            {/* Hero Section */}
            <section className="glass-card rounded-[32px] overflow-hidden p-8 sm:p-14 text-center max-w-[1280px] mx-auto space-y-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={0}
                    className="space-y-4"
                >
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider">
                        <Leaf className="w-3.5 h-3.5" /> Our Studio & Vision
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3E312C] tracking-tight">
                        About <span className="text-[#3F5B43]">3D Vishwa</span>
                    </h1>
                    <p className="text-sm sm:text-base text-[#65554D] max-w-2xl mx-auto leading-relaxed">
                        Innovating the future of custom manufacturing with high-precision 3D printing solutions, lithophanes, and bespoke resin art.
                    </p>
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="glass-card p-8 sm:p-14 rounded-[32px] max-w-[1280px] mx-auto text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E312C] tracking-tight">Our Mission</h2>
                <p className="text-sm sm:text-base text-[#65554D] leading-relaxed max-w-3xl mx-auto">
                    At 3D Vishwa, we are passionate about bringing your creative ideas to life with the power of modern 3D fabrication. Our mission is to empower innovators, engineers, designers, and families with reliable, precise, and affordable 3D printing solutions that unlock limitless possibilities.
                </p>
            </section>

            {/* Our Story Section */}
            <section className="glass-card p-8 sm:p-14 rounded-[32px] max-w-[1280px] mx-auto text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E312C] tracking-tight">Our Story</h2>
                <p className="text-sm sm:text-base text-[#65554D] leading-relaxed max-w-3xl mx-auto">
                    Founded by 3D printing enthusiasts in Pune, 3D Vishwa began as a vision to revolutionize personalized gifting and functional prototyping through cutting-edge technology. Over the years, we have built a reputation for innovation, precision, and excellence in delivering high-quality custom prints across India.
                </p>
            </section>

            {/* Values Section */}
            <section className="space-y-8 max-w-[1280px] mx-auto">
                <div className="text-center space-y-2">
                    <span className="text-xs font-semibold text-[#7B8F63] uppercase tracking-wider">Core Principles</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">What Drives Us</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Innovation",
                            desc: "We push the boundaries of what’s possible, constantly exploring new slicing and resin technologies to bring your ideas to life.",
                            icon: <Zap className="w-6 h-6 text-[#3F5B43]" />,
                        },
                        {
                            title: "Quality",
                            desc: "Our commitment to excellence ensures every print meets rigorous standards of structural accuracy and aesthetic detail.",
                            icon: <ShieldCheck className="w-6 h-6 text-[#3F5B43]" />,
                        },
                        {
                            title: "Customer Focus",
                            desc: "We provide personalized design support, understanding your exact specifications and exceeding expectations every time.",
                            icon: <HeartHandshake className="w-6 h-6 text-[#3F5B43]" />,
                        },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={idx}
                            variants={fadeUp}
                            className="glass-card organic-hover p-8 rounded-[24px] space-y-4"
                        >
                            <div className="p-3 bg-[#FCF8F3] rounded-[16px] w-fit border border-[#ECE2D3] shadow-sm">{item.icon}</div>
                            <h3 className="text-xl font-bold text-[#3E312C]">{item.title}</h3>
                            <p className="text-xs sm:text-sm text-[#65554D] leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Impact Section */}
            <section className="glass-card p-8 sm:p-14 rounded-[32px] max-w-[1280px] mx-auto text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E312C] tracking-tight">Our Impact</h2>
                <p className="text-sm sm:text-base text-[#65554D] leading-relaxed max-w-3xl mx-auto">
                    Through our custom 3D printing solutions, we’ve helped countless individuals and businesses accelerate creation, reduce production timelines, and materialize unique concepts. From personalized memorial lithophanes to engineering prototypes — we are making a tangible impact across industries.
                </p>
            </section>

            {/* CTA Section */}
            <section className="organic-section py-14 px-6 max-w-[1280px] mx-auto text-center space-y-6 relative overflow-hidden">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#3E312C]">Ready to Bring Your Ideas to Life?</h3>
                <p className="text-sm sm:text-base text-[#65554D] max-w-xl mx-auto leading-relaxed">
                    Get in touch with our studio today to discover how custom 3D printing can revolutionize your project or gift-giving.
                </p>
                <div>
                    <Link
                        href="/enquiry"
                        className="btn-primary inline-flex items-center gap-2 font-semibold text-sm shadow-md active:scale-95"
                    >
                        Contact Studio <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}