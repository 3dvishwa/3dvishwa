'use client';

import Head from "next/head";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function ThreeDPrinting() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
        }),
    };

    return (
        <>
            <Head>
                <title>3D Printing Services | 3DVishwa</title>
                <meta
                    name="description"
                    content="Explore our on-demand 3D printing services. High-precision, affordable, and fast turnarounds for prototypes, parts & more."
                />
            </Head>

            <section className="min-h-screen py-8 text-[#3E312C] font-sans">
                <div className="max-w-[1280px] mx-auto space-y-16">
                    {/* Hero Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        custom={0}
                        className="text-center max-w-3xl mx-auto space-y-4"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider">
                            On-Demand Studio Services
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3E312C] tracking-tight">
                            Professional <span className="text-[#3F5B43]">3D Printing</span> Services
                        </h1>
                        <p className="text-sm sm:text-base text-[#65554D] leading-relaxed">
                            Transform your ideas into reality with high-precision, fast-turnaround 3D printing solutions for prototyping, production, and innovation.
                        </p>
                    </motion.div>

                    {/* Service Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Rapid Prototyping",
                                description:
                                    "Bring your CAD models to life within hours using FDM, SLA, or SLS technologies.",
                                icon: "⚡",
                            },
                            {
                                title: "Custom Manufacturing",
                                description:
                                    "Print durable, functional end-use parts for medical, automotive, or consumer applications.",
                                icon: "🏭",
                            },
                            {
                                title: "Affordable Solutions",
                                description:
                                    "High-quality prints at competitive rates — perfect for startups and innovators.",
                                icon: "💰",
                            },
                        ].map((service, idx) => (
                            <motion.div
                                key={idx}
                                className="p-8 rounded-[24px] glass-card organic-hover flex flex-col justify-between"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={idx}
                                variants={fadeUp}
                            >
                                <div>
                                    <div className="text-3xl mb-4 p-3 bg-[#FCF8F3] rounded-[16px] w-fit border border-[#ECE2D3]">{service.icon}</div>
                                    <h3 className="text-xl font-bold mb-2 text-[#3E312C]">{service.title}</h3>
                                    <p className="text-xs sm:text-sm text-[#65554D] leading-relaxed">{service.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={3}
                        variants={fadeUp}
                        className="glass-card p-8 sm:p-12 rounded-[24px] text-center space-y-6 max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E312C] tracking-tight">
                            Ready to Print Your Next Idea?
                        </h2>
                        <p className="text-sm sm:text-base text-[#65554D] max-w-2xl mx-auto leading-relaxed">
                            Upload your design or talk to our experts to get started with your 3D printing project. Fast, affordable, and precise.
                        </p>
                        <div>
                            <Link
                                href="/enquiry"
                                className="btn-primary inline-block font-semibold text-sm shadow-md active:scale-95"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </motion.div>

                    {/* Trust Footnote */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={4}
                        variants={fadeUp}
                        className="text-center pb-8"
                    >
                        <p className="text-xs text-[#65554D] font-medium italic">
                            Trusted by innovators, startups, and companies across industries for precision 3D printing.
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
}