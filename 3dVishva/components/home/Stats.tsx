"use client";

import { motion } from "framer-motion";

import { companyStats } from "@/constants/company";


export default function Stats() {

    return (

        <motion.div

            initial="hidden"

            whileInView="visible"

            viewport={{
                once: true,
                amount: 0.4,
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
            mt-10
            grid
            grid-cols-2
            gap-6
            "
        >

            {companyStats.map((item) => (

                <motion.div

                    key={item.label}

                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 25,
                        },

                        visible: {
                            opacity: 1,
                            y: 0,
                        },
                    }}

                    whileHover={{
                        y: -8,
                        scale: 1.03,
                    }}

                    transition={{
                        duration: 0.3,
                    }}

                    className="
                    glass
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    p-5
                    transition
                    "
                >

                    {/* Glow */}

                    <div
                        className="
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
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
                            text-3xl
                            font-extrabold
                            text-blue-600
                            "
                        >
                            {item.value}
                        </h3>


                        <p
                            className="
                            mt-2
                            text-sm
                            text-slate-600
                            "
                        >
                            {item.label}
                        </p>

                    </div>


                </motion.div>

            ))}


        </motion.div>

    );
}