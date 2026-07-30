"use client";

import { motion } from "framer-motion";


const tech = [
    "Next.js",
    "React",
    "TypeScript",
    "Flutter",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
];


export default function TechStack() {

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
                        staggerChildren: 0.08,
                    },
                },
            }}

            className="
            mt-10
            flex
            flex-wrap
            gap-3
            "

        >

            {tech.map((item, index) => (

                <motion.div

                    key={item}

                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 20,
                            scale: 0.85,
                        },

                        visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        },
                    }}

                    animate={{
                        y: [0, -3, 0],
                    }}

                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.15,
                    }}

                    whileHover={{
                        y: -8,
                        scale: 1.08,
                    }}

                    className="
                    glass
                    group
                    relative
                    overflow-hidden
                    rounded-full
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-slate-700
                    cursor-default
                    "
                >

                    {/* Hover Gradient */}

                    <span
                        className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-blue-500/20
                        via-violet-500/20
                        to-cyan-500/20
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                        "
                    />


                    <span className="relative">
                        {item}
                    </span>


                </motion.div>

            ))}

        </motion.div>

    );

}