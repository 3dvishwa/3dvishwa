"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import Container from "../../components/layout/Container";

import FloatingCards from "./FloatingCards";
import HeroStats from "./HeroStats";
import TechStack from "./TechStack";

import FadeIn from "@/components/animations/FadeIn";


export default function Hero() {


    return (

        <section
            id="home"
            className="
            relative
            overflow-hidden
            py-20
            lg:py-28
            "
        >



            {/* Background Glow */}


            <div
                className="
                absolute
                inset-0
                -z-10
                overflow-hidden
                "
            >



                <motion.div

                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}

                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}

                    className="
                    absolute
                    left-0
                    top-10
                    h-96
                    w-96
                    rounded-full
                    bg-blue-300/30
                    blur-[120px]
                    "
                />





                <motion.div

                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.25, 0.45, 0.25],
                    }}

                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}

                    className="
                    absolute
                    right-0
                    top-40
                    h-96
                    w-96
                    rounded-full
                    bg-violet-300/30
                    blur-[120px]
                    "
                />






                <motion.div

                    animate={{
                        y: [0, -40, 0],
                    }}

                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}

                    className="
                    absolute
                    bottom-0
                    left-1/2
                    h-80
                    w-80
                    -translate-x-1/2
                    rounded-full
                    bg-cyan-300/20
                    blur-[120px]
                    "
                />



            </div>






            <Container>


                <div
                    className="
                    grid
                    items-center
                    gap-16
                    lg:grid-cols-2
                    "
                >






                    {/* LEFT */}



                    <FadeIn>


                        <div>



                            <motion.span

                                initial={{
                                    opacity: 0,
                                    y: -20,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    duration: 0.6,
                                }}


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

                                🚀 Trusted Software Development Partner

                            </motion.span>






                            <h1
                                className="
                                mt-8
                                text-balance
                                text-5xl
                                font-extrabold
                                leading-tight
                                lg:text-7xl
                                "
                            >

                                Building


                                <span
                                    className="
                                    gradient-text
                                    "
                                >

                                    {" "}Digital Products{" "}

                                </span>


                                That Drive Business Growth


                            </h1>






                            <p
                                className="
                                mt-8
                                max-w-xl
                                text-lg
                                leading-8
                                text-slate-600
                                "
                            >

                                We craft lightning-fast websites,
                                scalable mobile applications,
                                and secure cloud solutions that
                                empower startups, enterprises,
                                and growing businesses worldwide.

                            </p>








                            <div
                                className="
                                mt-10
                                flex
                                flex-wrap
                                gap-4
                                "
                            >


                                <Link

                                    href="#contact"

                                    className="
                                    rounded-full
                                    bg-blue-600
                                    px-8
                                    py-4
                                    font-semibold
                                    text-white
                                    transition
                                    hover:-translate-y-1
                                    hover:bg-blue-700
                                    "

                                >

                                    Start Your Project

                                </Link>






                                <Link

                                    href="#portfolio"

                                    className="
                                    glass
                                    rounded-full
                                    px-8
                                    py-4
                                    font-semibold
                                    transition
                                    hover:-translate-y-1
                                    "

                                >

                                    View Portfolio

                                </Link>


                            </div>






                            <HeroStats />



                            <TechStack />




                        </div>


                    </FadeIn>









                    {/* RIGHT */}



                    <FadeIn delay={0.2}>


                        <FloatingCards />


                    </FadeIn>




                </div>


            </Container>


        </section>

    );

}