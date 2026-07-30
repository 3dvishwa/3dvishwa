"use client";

import { motion } from "framer-motion";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import { technologies } from "@/constants/technologies";


export default function Technology() {

    return (

        <Section>

            <Container>

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 40,
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
                        duration: 0.7,
                    }}

                    className="
                    glass
                    relative
                    overflow-hidden
                    rounded-[32px]
                    p-10
                    text-center
                    md:p-14
                    "
                >

                    {/* Background Glow */}

                    <div
                        className="
                        absolute
                        -left-20
                        -top-20
                        h-64
                        w-64
                        rounded-full
                        bg-blue-400/20
                        blur-3xl
                        "
                    />


                    <div
                        className="
                        absolute
                        -bottom-20
                        -right-20
                        h-64
                        w-64
                        rounded-full
                        bg-violet-400/20
                        blur-3xl
                        "
                    />


                    <div className="relative">


                        <h2
                            className="
                            text-3xl
                            font-bold
                            md:text-4xl
                            "
                        >

                            Technologies We

                            <span className="gradient-text">
                                {" "}Work With
                            </span>

                        </h2>



                        <p
                            className="
                            mx-auto
                            mt-4
                            max-w-2xl
                            text-slate-600
                            "
                        >

                            We use modern, reliable technologies
                            to build fast, scalable, and secure
                            digital solutions for businesses.

                        </p>




                        <motion.div

                            initial="hidden"

                            whileInView="visible"

                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}

                            variants={{
                                hidden: {},

                                visible: {
                                    transition: {
                                        staggerChildren: 0.06,
                                    },
                                },
                            }}

                            className="
                            mt-10
                            flex
                            flex-wrap
                            justify-center
                            gap-4
                            "

                        >

                            {technologies.map((tech) => (

                                <motion.span

                                    key={tech}

                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: 20,
                                        },

                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                        },
                                    }}

                                    whileHover={{
                                        y: -6,
                                        scale: 1.05,
                                    }}

                                    className="
                                    rounded-full
                                    border
                                    border-white/60
                                    bg-white/50
                                    px-5
                                    py-3
                                    font-medium
                                    text-slate-700
                                    shadow-sm
                                    backdrop-blur-md
                                    transition
                                    hover:bg-white
                                    hover:shadow-xl
                                    "
                                >

                                    {tech}

                                </motion.span>

                            ))}


                        </motion.div>


                    </div>


                </motion.div>


            </Container>


        </Section>

    );

}