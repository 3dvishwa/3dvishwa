"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/ui/GlassCard";

import { testimonials } from "@/constants/testimonials";


export default function Testimonials() {

    return (

        <Section>

            <Container>


                {/* Heading */}

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 30,
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}

                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}

                    transition={{
                        duration: 0.6,
                    }}

                    className="
                    mx-auto
                    max-w-3xl
                    text-center
                    "
                >

                    <span
                        className="
                        glass
                        inline-flex
                        rounded-full
                        px-5
                        py-2
                        text-sm
                        font-medium
                        text-blue-700
                        "
                    >
                        Client Reviews
                    </span>



                    <h2
                        className="
                        mt-6
                        text-4xl
                        font-bold
                        md:text-5xl
                        "
                    >

                        What Our Clients

                        <span className="gradient-text">
                            {" "}Say
                        </span>

                    </h2>



                    <p
                        className="
                        mt-6
                        text-lg
                        text-slate-600
                        "
                    >

                        We build long-term partnerships by delivering
                        reliable and impactful digital solutions.

                    </p>


                </motion.div>





                {/* Cards */}


                <motion.div

                    initial="hidden"

                    whileInView="visible"

                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}

                    variants={{
                        hidden: {},

                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}

                    className="
                    mt-16
                    grid
                    gap-8
                    md:grid-cols-2
                    lg:grid-cols-3
                    "

                >


                    {testimonials.map((item) => (


                        <motion.div

                            key={item.name}

                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 40,
                                },

                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                            }}

                            whileHover={{
                                y: -10,
                            }}

                        >


                            <GlassCard

                                className="
                                group
                                relative
                                overflow-hidden
                                transition-all
                                duration-300
                                "
                            >


                                {/* Glow */}

                                <div
                                    className="
                                    absolute
                                    -right-10
                                    -top-10
                                    h-32
                                    w-32
                                    rounded-full
                                    bg-blue-400/20
                                    blur-3xl
                                    transition
                                    group-hover:bg-violet-400/30
                                    "
                                />



                                <div className="relative">


                                    {/* Quote */}

                                    <Quote
                                        className="
                                        h-10
                                        w-10
                                        text-blue-200
                                        "
                                    />



                                    {/* Rating */}

                                    <div
                                        className="
                                        mt-5
                                        flex
                                        gap-1
                                        text-yellow-500
                                        "
                                    >

                                        {Array.from({
                                            length: item.rating,
                                        }).map((_, index) => (

                                            <span
                                                key={index}
                                                className="text-lg"
                                            >
                                                ★
                                            </span>

                                        ))}

                                    </div>





                                    {/* Message */}

                                    <p
                                        className="
                                        mt-6
                                        leading-7
                                        text-slate-600
                                        "
                                    >

                                        "{item.message}"

                                    </p>





                                    {/* Client */}

                                    <div
                                        className="
                                        mt-8
                                        border-t
                                        border-white/40
                                        pt-5
                                        "
                                    >

                                        <h3
                                            className="
                                            font-bold
                                            "
                                        >
                                            {item.name}
                                        </h3>


                                        <p
                                            className="
                                            text-sm
                                            text-slate-500
                                            "
                                        >
                                            {item.role}
                                        </p>

                                    </div>



                                </div>


                            </GlassCard>


                        </motion.div>


                    ))}


                </motion.div>



            </Container>


        </Section>

    );

}