"use client";

import { motion } from "framer-motion";

import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";
import GlassCard from "../../components/ui/GlassCard";

import { processSteps } from "../../constants/process";


export default function Process() {


    return (

        <Section>


            <Container>





                {/* HEADER */}



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

                        Our Process

                    </span>





                    <h2
                        className="
                        mt-6
                        text-4xl
                        font-bold
                        md:text-5xl
                        "
                    >

                        From Idea To


                        <span className="gradient-text">

                            {" "}Successful Product

                        </span>


                    </h2>





                    <p
                        className="
                        mt-6
                        text-lg
                        text-slate-600
                        "
                    >

                        A transparent development process designed
                        to deliver quality, speed, and reliability.

                    </p>



                </motion.div>








                {/* TIMELINE */}




                <div
                    className="
                    relative
                    mt-16
                    "
                >




                    {/* Animated Line */}



                    <motion.div

                        initial={{
                            height: 0,
                        }}

                        whileInView={{
                            height: "100%",
                        }}

                        viewport={{
                            once: true,
                        }}

                        transition={{
                            duration: 1.5,
                        }}


                        className="
                        absolute
                        left-6
                        top-0
                        hidden
                        w-px
                        bg-gradient-to-b
                        from-blue-600
                        via-violet-600
                        to-cyan-500
                        md:block
                        "

                    />








                    <div
                        className="
                        space-y-8
                        "
                    >




                        {processSteps.map(
                            (step, index) => (


                                <motion.div


                                    key={step.number}



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

                                        delay: index * 0.15,
                                        duration: 0.6,

                                    }}



                                    className="
                                relative
                                md:pl-20
                                "

                                >







                                    {/* Number */}




                                    <motion.div

                                        animate={{

                                            boxShadow: [
                                                "0 0 0 0 rgba(37,99,235,0)",
                                                "0 0 30px 10px rgba(37,99,235,.25)",
                                                "0 0 0 0 rgba(37,99,235,0)",
                                            ],

                                        }}


                                        transition={{

                                            duration: 3,
                                            repeat: Infinity,

                                        }}


                                        className="
                                    absolute
                                    left-0
                                    hidden
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gradient-to-br
                                    from-blue-600
                                    to-violet-600
                                    font-bold
                                    text-white
                                    md:flex
                                    "

                                    >

                                        {step.number}


                                    </motion.div>









                                    <GlassCard

                                        className="
                                    group
                                    transition
                                    duration-300
                                    hover:-translate-y-2
                                    "

                                    >



                                        <h3
                                            className="
                                        text-xl
                                        font-bold
                                        "
                                        >

                                            {step.title}

                                        </h3>





                                        <p
                                            className="
                                        mt-3
                                        leading-7
                                        text-slate-600
                                        "
                                        >

                                            {step.description}

                                        </p>





                                    </GlassCard>





                                </motion.div>


                            ))}



                    </div>




                </div>




            </Container>


        </Section>


    );

}