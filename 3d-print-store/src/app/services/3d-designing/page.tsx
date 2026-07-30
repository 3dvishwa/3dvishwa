'use client';

import Head from "next/head";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function ThreeDDesigning() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
        }),
    };

    const services = [
        {
            title: "Concept & Ideation",
            description:
                "Sketches, mood-boards and quick 3D concept models to validate form, function and manufacturability.",
            icon: "✨",
        },
        {
            title: "CAD & Parametric Modeling",
            description:
                "Precision CAD modelling (solid & parametric) for assemblies, mechanisms and manufacturable parts.",
            icon: "🧩",
        },
        {
            title: "Mesh & Scan Cleanup",
            description:
                "Reverse-engineering, mesh repair, retopology and optimization for printing or simulation.",
            icon: "🔧",
        },
        {
            title: "Rapid Iterations",
            description:
                "Fast turnaround design revisions based on feedback — ideal for prototyping and product development.",
            icon: "⚡",
        },
        {
            title: "File Preparation",
            description:
                "Export-ready files and print-prep: oriented, hollowed, supported and sliced-ready if needed.",
            icon: "📦",
        },
        {
            title: "Engineering Drawings & BOM",
            description:
                "2D drawings, exploded views and Bills of Materials for manufacturing and assembly.",
            icon: "📐",
        },
    ];

    return (
        <>
            <Head>
                <title>3D Designing Services | 3DVishwa</title>
                <meta
                    name="description"
                    content="Professional 3D design services — CAD, concept modelling, reverse engineering and optimized print-ready files (STL, OBJ, 3MF, STEP and more)."
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
                            Expert <span className="text-[#3F5B43]">3D Designing & CAD</span> Services
                        </h1>
                        <p className="text-sm sm:text-base text-[#65554D] leading-relaxed">
                            From concept sketches to production-ready CAD models — we deliver accurate, manufacturable 3D
                            designs and provide them in the formats you need: STL, 3MF, OBJ, STEP, IGES and more.
                        </p>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((s, idx) => (
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
                                    <div className="text-3xl mb-4 p-3 bg-[#FCF8F3] rounded-[16px] w-fit border border-[#ECE2D3]">{s.icon}</div>
                                    <h3 className="text-xl font-bold mb-2 text-[#3E312C]">{s.title}</h3>
                                    <p className="text-xs sm:text-sm text-[#65554D] leading-relaxed">{s.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Deliverables / File Formats */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={3}
                        variants={fadeUp}
                        className="glass-card p-8 sm:p-12 rounded-[24px] space-y-6 max-w-5xl mx-auto"
                    >
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E312C] tracking-tight">What You’ll Receive</h2>
                        <p className="text-sm sm:text-base text-[#65554D] max-w-3xl leading-relaxed">
                            We deliver clean, fully annotated, production-ready design files and supporting materials so you
                            can move straight to manufacturing or 3D printing.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            <div className="p-6 bg-[#FCF8F3] rounded-[20px] border border-[#ECE2D3] space-y-2">
                                <h4 className="font-bold text-sm text-[#3E312C]">3D File Formats</h4>
                                <ul className="text-xs text-[#65554D] space-y-1.5 leading-relaxed">
                                    <li>• STL — Mesh for 3D printing</li>
                                    <li>• 3MF — Rich print package</li>
                                    <li>• OBJ — Mesh with materials</li>
                                    <li>• STEP / IGES — CAD exchange</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-[#FCF8F3] rounded-[20px] border border-[#ECE2D3] space-y-2">
                                <h4 className="font-bold text-sm text-[#3E312C]">Documentation</h4>
                                <ul className="text-xs text-[#65554D] space-y-1.5 leading-relaxed">
                                    <li>• 2D drawings & dimensions</li>
                                    <li>• Assembly / Exploded views</li>
                                    <li>• BOM (Bill of Materials)</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-[#FCF8F3] rounded-[20px] border border-[#ECE2D3] space-y-2">
                                <h4 className="font-bold text-sm text-[#3E312C]">Extras</h4>
                                <ul className="text-xs text-[#65554D] space-y-1.5 leading-relaxed">
                                    <li>• Design for Additive Manufacturing</li>
                                    <li>• Hollowing & support setup</li>
                                    <li>• Separate parts & exports</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={4}
                        variants={fadeUp}
                        className="glass-card p-8 sm:p-12 rounded-[24px] text-center space-y-6 max-w-4xl mx-auto"
                    >
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E312C] tracking-tight">
                            Ready to Bring Your Idea to Life?
                        </h2>
                        <p className="text-sm sm:text-base text-[#65554D] max-w-2xl mx-auto leading-relaxed">
                            Share your brief, reference images, or existing scans — our designers will create precision 3D
                            models and deliver the file formats you need.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                            <Link
                                href="/enquiry"
                                className="btn-primary inline-block font-semibold text-sm shadow-md active:scale-95"
                            >
                                Request a Quote
                            </Link>

                            <Link
                                href="/custom-order"
                                className="btn-secondary inline-block font-semibold text-sm active:scale-95"
                            >
                                Upload References
                            </Link>
                        </div>
                    </motion.div>

                    {/* Trust Footnote */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={5}
                        variants={fadeUp}
                        className="text-center pb-8"
                    >
                        <p className="text-xs text-[#65554D] font-medium italic">
                            Trusted by product teams, inventors and manufacturers for accurate CAD and printable designs.
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
}