"use client";

import { motion } from "framer-motion";

import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";
import GlassCard from "../../components/ui/GlassCard";

import Stats from "./Stats";

import { companyHighlights } from "@/constants/company";



export default function About() {


    return (

        <Section>


            <Container>


                <div
                    id="about"
                    className="
                    grid
                    items-center
                    gap-12
                    lg:grid-cols-2
                    "
                >




                    {/* LEFT CONTENT */}



                    <motion.div

                        initial={{
                            opacity: 0,
                            x: -40,
                        }}

                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}

                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}

                        transition={{
                            duration: 0.7,
                        }}

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

                            About 3DVishva

                        </span>





                        <h2
                            className="
                            mt-6
                            text-4xl
                            font-bold
                            leading-tight
                            md:text-5xl
                            "
                        >

                            Transforming Ideas Into


                            <span
                                className="
                                gradient-text
                                "
                            >

                                {" "}Digital Experiences

                            </span>


                        </h2>





                        <p
                            className="
                            mt-6
                            text-lg
                            leading-8
                            text-slate-600
                            "
                        >

                            3DVishva Software Solutions helps
                            businesses build reliable digital
                            products through modern web development,
                            mobile applications, and cloud
                            technologies.

                        </p>




                        <p
                            className="
                            mt-4
                            text-lg
                            leading-8
                            text-slate-600
                            "
                        >

                            We combine creativity, engineering
                            excellence, and business understanding
                            to deliver solutions that are secure,
                            scalable, and future-ready.

                        </p>



                        <Stats />


                    </motion.div>









                    {/* RIGHT PANEL */}



                    <motion.div

                        initial={{
                            opacity: 0,
                            x: 40,
                        }}

                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}

                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}

                        transition={{
                            duration: 0.7,
                            delay: 0.15,
                        }}

                    >



                        <GlassCard
                            className="
                            relative
                            overflow-hidden
                            "
                        >



                            <div
                                className="
                                absolute
                                -right-20
                                -top-20
                                h-60
                                w-60
                                rounded-full
                                bg-blue-400/20
                                blur-3xl
                                "
                            />





                            <div
                                className="
                                relative
                                space-y-8
                                "
                            >


                                <h3
                                    className="
                                    text-2xl
                                    font-bold
                                    "
                                >

                                    Why Businesses Choose Us

                                </h3>




                                <motion.div

                                    variants={{
                                        hidden: {},

                                        visible: {
                                            transition: {
                                                staggerChildren: 0.15,
                                            },
                                        },
                                    }}

                                    initial="hidden"

                                    whileInView="visible"

                                    viewport={{
                                        once: true,
                                    }}

                                    className="
                                    space-y-5
                                    "

                                >


                                    {companyHighlights.map(
                                        (item) => (


                                            <motion.div

                                                key={item.title}


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
                                                    y: -5,
                                                }}



                                                className="
                                            rounded-2xl
                                            border
                                            border-white/50
                                            bg-white/40
                                            p-5
                                            transition
                                            hover:bg-white/70
                                            "

                                            >


                                                <h4
                                                    className="
                                                font-semibold
                                                "
                                                >

                                                    {item.title}

                                                </h4>



                                                <p
                                                    className="
                                                mt-2
                                                text-sm
                                                leading-6
                                                text-slate-600
                                                "
                                                >

                                                    {item.description}

                                                </p>



                                            </motion.div>


                                        ))}


                                </motion.div>


                            </div>



                        </GlassCard>



                    </motion.div>



                </div>



            </Container>


        </Section>


    );

}