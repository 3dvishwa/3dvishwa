"use client";

import { motion } from "framer-motion";


const stats = [
    {
        value: "30+",
        label: "Projects Delivered",
    },
    {
        value: "10+",
        label: "Happy Clients",
    },
    {
        value: "8+",
        label: "Years Experience",
    },
];



export default function HeroStats() {


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
            mt-12
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-3
            sm:gap-6
            "

        >




            {stats.map((stat) => (



                <motion.div


                    key={stat.label}



                    variants={{

                        hidden: {
                            opacity: 0,
                            y: 30,
                            scale: 0.95,
                        },

                        visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        },

                    }}



                    transition={{
                        type: "spring",
                        stiffness: 120,
                    }}



                    whileHover={{

                        y: -8,
                        scale: 1.03,

                    }}



                    className="
                    group
                    relative
                    overflow-hidden
                    glass
                    rounded-3xl
                    px-5
                    py-6
                    text-center
                    "

                >




                    {/* Hover Glow */}


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





                    <div
                        className="
                        relative
                        "
                    >



                        <motion.h3

                            initial={{
                                opacity: 0,
                                scale: 0.5,
                            }}

                            whileInView={{
                                opacity: 1,
                                scale: 1,
                            }}

                            transition={{
                                delay: 0.2,
                            }}


                            className="
                            text-3xl
                            font-extrabold
                            gradient-text
                            "
                        >

                            {stat.value}


                        </motion.h3>





                        <p

                            className="
                            mt-2
                            text-xs
                            font-medium
                            leading-5
                            text-slate-500
                            sm:text-sm
                            "

                        >

                            {stat.label}

                        </p>




                    </div>



                </motion.div>



            ))}



        </motion.div>


    );

}