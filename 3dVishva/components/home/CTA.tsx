"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";


export default function CTA() {

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
                    rounded-[36px]
                    p-8
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
                        h-72
                        w-72
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
                        h-72
                        w-72
                        rounded-full
                        bg-violet-400/20
                        blur-3xl
                        "
                    />



                    <div className="relative">


                        <span
                            className="
                            inline-flex
                            rounded-full
                            bg-blue-100
                            px-5
                            py-2
                            text-sm
                            font-medium
                            text-blue-700
                            "
                        >
                            🚀 Start Your Project
                        </span>




                        <h2
                            className="
                            mt-6
                            text-4xl
                            font-bold
                            leading-tight
                            md:text-6xl
                            "
                        >

                            Ready To Build Your

                            <span className="gradient-text">
                                {" "}Digital Future?
                            </span>

                        </h2>





                        <p
                            className="
                            mx-auto
                            mt-6
                            max-w-2xl
                            text-lg
                            leading-8
                            text-slate-600
                            "
                        >

                            Whether you need a modern website,
                            mobile application, or scalable cloud
                            infrastructure, our team is ready to
                            turn your ideas into powerful digital
                            products.

                        </p>





                        <div
                            className="
                            mt-10
                            flex
                            flex-wrap
                            justify-center
                            gap-4
                            "
                        >


                            <a
                                href="#contact"

                                className="
                                group
                                flex
                                items-center
                                gap-2
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

                                Discuss Your Project

                                <ArrowRight
                                    size={18}
                                    className="
                                    transition
                                    group-hover:translate-x-1
                                    "
                                />

                            </a>





                            <a

                                href="https://wa.me/91XXXXXXXXXX?text=Hello%203DVishva,%20I%20want%20to%20discuss%20a%20project"

                                target="_blank"

                                rel="noopener noreferrer"

                                className="
                                glass
                                flex
                                items-center
                                gap-2
                                rounded-full
                                px-8
                                py-4
                                font-semibold
                                transition
                                hover:-translate-y-1
                                "
                            >

                                <MessageCircle
                                    size={20}
                                    className="text-green-600"
                                />

                                WhatsApp Us

                            </a>


                        </div>





                        <div
                            className="
                            mt-10
                            flex
                            flex-wrap
                            justify-center
                            gap-6
                            text-sm
                            text-slate-500
                            "
                        >

                            <span>
                                ✓ Free Consultation
                            </span>

                            <span>
                                ✓ Custom Solutions
                            </span>

                            <span>
                                ✓ Long-Term Support
                            </span>

                        </div>


                    </div>


                </motion.div>


            </Container>


        </Section>

    );

}