"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/ui/GlassCard";

import { pricingPlans } from "@/constants/pricing";


export default function Pricing() {


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

                        Pricing

                    </span>





                    <h2
                        className="
                        mt-6
                        text-4xl
                        font-bold
                        md:text-5xl
                        "
                    >

                        Simple Plans For


                        <span className="gradient-text">

                            {" "}Every Business

                        </span>


                    </h2>





                    <p
                        className="
                        mt-6
                        text-lg
                        text-slate-600
                        "
                    >

                        Flexible solutions designed to match your
                        business goals and technology requirements.

                    </p>



                </motion.div>







                {/* PRICING CARDS */}



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
                    lg:grid-cols-3
                    "

                >




                    {pricingPlans.map((plan) => (


                        <motion.div


                            key={plan.name}



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
                                y: -12,
                            }}


                            className="
                            relative
                            "

                        >





                            {plan.popular && (

                                <motion.div

                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}

                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}


                                    className="
                                    absolute
                                    -top-4
                                    left-1/2
                                    z-10
                                    -translate-x-1/2
                                    rounded-full
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-violet-600
                                    px-5
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    "

                                >

                                    Most Popular

                                </motion.div>

                            )}







                            <GlassCard

                                className={`
                                group
                                relative
                                overflow-hidden
                                transition-all
                                duration-300

                                ${plan.popular
                                        ?
                                        "ring-2 ring-blue-500 shadow-2xl"
                                        :
                                        ""
                                    }
                                `}

                            >





                                {/* Glow */}



                                <div

                                    className="
                                    absolute
                                    -right-20
                                    -top-20
                                    h-48
                                    w-48
                                    rounded-full
                                    bg-blue-400/20
                                    blur-3xl
                                    transition
                                    group-hover:bg-violet-400/30
                                    "

                                />








                                <div className="relative">



                                    <h3
                                        className="
                                        text-2xl
                                        font-bold
                                        "
                                    >

                                        {plan.name}

                                    </h3>





                                    <p
                                        className="
                                        mt-3
                                        text-sm
                                        text-slate-600
                                        "
                                    >

                                        {plan.description}

                                    </p>







                                    <div
                                        className="
                                        mt-8
                                        text-4xl
                                        font-extrabold
                                        gradient-text
                                        "
                                    >

                                        {plan.price}

                                    </div>







                                    <ul
                                        className="
                                        mt-8
                                        space-y-4
                                        "
                                    >

                                        {plan.features.map((feature) => (


                                            <li

                                                key={feature}

                                                className="
                                                flex
                                                items-center
                                                gap-3
                                                text-sm
                                                text-slate-700
                                                "

                                            >


                                                <span

                                                    className="
                                                    flex
                                                    h-6
                                                    w-6
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-blue-100
                                                    text-xs
                                                    font-bold
                                                    text-blue-600
                                                    "

                                                >

                                                    ✓

                                                </span>


                                                {feature}


                                            </li>


                                        ))}


                                    </ul>








                                    <Link

                                        href="#contact"

                                        className={`
                                        mt-10
                                        block
                                        w-full
                                        rounded-full
                                        px-6
                                        py-4
                                        text-center
                                        font-semibold
                                        transition
                                        
                                        ${plan.popular
                                                ?
                                                "bg-blue-600 text-white hover:bg-blue-700"
                                                :
                                                "bg-white/60 hover:bg-white"
                                            }
                                        `}

                                    >

                                        Get Started


                                    </Link>




                                </div>




                            </GlassCard>




                        </motion.div>



                    ))}



                </motion.div>


                <motion.div

                    initial={{
                        opacity: 0,
                        y: 20,
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}

                    viewport={{
                        once: true,
                    }}

                    transition={{
                        duration: 0.5,
                    }}

                    className="
    mx-auto
    mt-12
    max-w-4xl
    rounded-3xl
    border
    border-blue-100
    bg-blue-50/50
    p-6
    text-center
    "

                >

                    <p
                        className="
        text-sm
        leading-6
        text-slate-600
        "
                    >

                        <span className="font-semibold text-slate-800">
                            Note:
                        </span>

                        Project pricing covers development and initial deployment support.
                        Monthly maintenance, incremental feature updates, cloud hosting,
                        third-party services, domain, server, platform subscriptions,
                        and infrastructure charges are billed separately based on usage
                        and requirements.

                    </p>


                </motion.div>

            </Container>


        </Section>

    );

}