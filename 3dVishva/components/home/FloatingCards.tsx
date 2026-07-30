"use client";

import { motion } from "framer-motion";


const cards = [
    {
        title: "🌐 Website Development",
        description:
            "Next.js, React, Tailwind CSS & Enterprise Web Applications.",
        className:
            "left-8 top-8 w-72",
        delay: 0,
        float: 4,
    },

    {
        title: "📱 Mobile Apps",
        description:
            "Flutter & React Native apps for Android and iOS.",
        className:
            "right-0 top-52 w-80",
        delay: 0.2,
        float: 5,
    },

    {
        title: "☁️ Cloud Deployment",
        description:
            "AWS, Azure, Docker & Kubernetes deployment automation.",
        className:
            "bottom-10 left-24 w-72",
        delay: 0.4,
        float: 6,
    },
];



export default function FloatingCards() {


    return (

        <div
            className="
            relative
            hidden
            h-[620px]
            lg:block
            "
        >



            {/* Animated Center Orb */}


            <motion.div

                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.25, 0.45, 0.25],
                }}

                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}


                className="
                absolute
                left-1/2
                top-1/2
                h-56
                w-56
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gradient-to-r
                from-blue-500
                via-violet-500
                to-cyan-500
                blur-3xl
                "
            />







            {cards.map((card) => (


                <motion.div


                    key={card.title}



                    initial={{
                        opacity: 0,
                        y: 50,
                        scale: 0.95,
                    }}



                    animate={{
                        opacity: 1,
                        y: [0, -12, 0],
                    }}



                    transition={{

                        opacity: {
                            duration: 0.7,
                            delay: card.delay,
                        },

                        y: {
                            duration: card.float,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: card.delay,
                        },

                    }}



                    whileHover={{
                        scale: 1.08,
                        y: -20,
                        rotate: 2,
                    }}



                    className={`
                    glass
                    group
                    absolute
                    overflow-hidden
                    rounded-3xl
                    p-6
                    transition
                    ${card.className}
                    `}

                >



                    {/* Animated Glass Highlight */}


                    <div
                        className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-white/30
                        via-transparent
                        to-blue-500/10
                        opacity-0
                        transition
                        duration-500
                        group-hover:opacity-100
                        "
                    />





                    <div
                        className="
                        relative
                        z-10
                        "
                    >



                        <h3
                            className="
                            text-lg
                            font-bold
                            "
                        >

                            {card.title}

                        </h3>




                        <p
                            className="
                            mt-3
                            text-sm
                            leading-6
                            text-slate-600
                            "
                        >

                            {card.description}

                        </p>



                    </div>







                    {/* Bottom Light */}


                    <motion.div

                        animate={{
                            x: ["-100%", "100%"],
                        }}

                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}


                        className="
                        absolute
                        bottom-0
                        left-0
                        h-px
                        w-full
                        bg-gradient-to-r
                        from-transparent
                        via-blue-500
                        to-transparent
                        "

                    />




                </motion.div>


            ))}



        </div>

    );

}