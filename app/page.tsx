'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Code2, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { LogoLayeredCube } from './logolayeredcube';
export default function HubLandingPage() {
    const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || 'https://store.3dvishwa.com';
    const techworksUrl = process.env.NEXT_PUBLIC_TECHWORKS_URL || 'https://techworks.3dvishwa.com';

    return (
        <div className="relative min-h-screen flex flex-col justify-between overflow-hidden px-4 py-4 sm:px-6 sm:py-6 bg-[#090D16]">

            {/* Background Neon Grid & Radial Glows */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />

            <header className="max-w-[1000px] w-full mx-auto flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-xl glass-card-tech border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center justify-center">
                        <LogoLayeredCube className="w-6 h-6" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight text-white uppercase font-mono">
                        3D <span className="text-cyan-400">Vishwa</span>
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[950px] w-full mx-auto my-auto py-6 z-10">

                {/* Title */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono uppercase tracking-widest mb-3"
                    >
                        <Sparkles className="w-3 h-3" />Explore 3D Vishwa
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight"
                    >
                        ENGINEERING THE <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                            PHYSICAL & DIGITAL
                        </span>
                    </motion.h1>
                </div>

                {/* 2 Glassmorphism Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">

                    {/* Card 1: 3D Printing Studio */}
                    <motion.a
                        href={storeUrl}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -4 }}
                        className="group glass-card-tech rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] cursor-pointer"
                    >
                        <div className="space-y-4 z-10">
                            <div className="flex items-center justify-between">
                                <div className="w-11 h-11 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                    <Box className="w-5 h-5" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">HARDWARE & MANUFACTURING</span>
                                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 group-hover:text-cyan-300 transition-colors">
                                    3D Printing Studio
                                </h2>
                                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                                    Additive manufacturing, high-precision CAD prototyping, resin sculpture casting, lithophanes, and custom prints.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between z-10">
                            <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
                                store.3dvishwa.com
                            </span>
                            <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Launch Studio &rarr;
                            </span>
                        </div>

                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.a>

                    {/* Card 2: TechWorks Software Solutions */}
                    <motion.a
                        href={techworksUrl}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ y: -4 }}
                        className="group glass-card-tech rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] cursor-pointer"
                    >
                        <div className="space-y-4 z-10">
                            <div className="flex items-center justify-between">
                                <div className="w-11 h-11 rounded-xl bg-violet-950/40 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                    <Code2 className="w-5 h-5" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-violet-500 group-hover:text-white transition-all">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400">SOFTWARE & CLOUD ENGINEERING</span>
                                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 group-hover:text-violet-300 transition-colors">
                                    TechWorks
                                </h2>
                                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                                    Full-stack Web & Mobile platforms, cloud architecture, bespoke SaaS engineering, and enterprise IT builds.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between z-10">
                            <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
                                techworks.3dvishwa.com
                            </span>
                            <span className="text-[11px] font-bold text-violet-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Explore TechWorks &rarr;
                            </span>
                        </div>

                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.a>

                </div>
            </main>

            ```tsx
            {/* Footer */}
            <footer className="max-w-[1000px] w-full mx-auto text-center z-10 pt-4 border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                    <p className="text-[11px] text-slate-500 font-mono">
                        &copy; {new Date().getFullYear()} 3DVISHWA ECOSYSTEM. ALL RIGHTS RESERVED.
                    </p>

                    <div className="hidden sm:block w-px h-3 bg-white/10" />

                    <div className="flex items-center gap-4">
                        <a
                            href="/terms"
                            className="text-[11px] text-slate-500 hover:text-cyan-400 font-mono transition-colors"
                        >
                            Terms of Service
                        </a>

                        <a
                            href="/privacy"
                            className="text-[11px] text-slate-500 hover:text-cyan-400 font-mono transition-colors"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </footer>
            ```

        </div>
    );
}