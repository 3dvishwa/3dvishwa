"use client";

import { motion } from "framer-motion";


export default function MotionCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {


    return (

        <motion.div

            variants={{
                hidden: {
                    opacity: 0,
                    y: 40,
                },

                show: {
                    opacity: 1,
                    y: 0,
                },
            }}

            whileHover={{
                y: -8,
            }}

            transition={{
                duration: 0.3,
            }}

            className={className}

        >

            {children}

        </motion.div>

    );

}