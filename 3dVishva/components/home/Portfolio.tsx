"use client";

import { motion } from "framer-motion";
import {
    Globe,
    Smartphone,
    Cloud,
    BarChart3,
    GraduationCap,
    Layers,
} from "lucide-react";

import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";
import GlassCard from "../../components/ui/GlassCard";

import { projects } from "../../constants/portfolio";


const icons = [
    Globe,
    Smartphone,
    Cloud,
    BarChart3,
    GraduationCap,
    Layers,
];


export default function Portfolio() {

    return (

        <Section>

            <Container>


                {/* Heading */}

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
                        Our Portfolio
                    </span>


                    <h2
                        className="
                        mt-6
                        text-4xl
                        font-bold
                        md:text-5xl
                        "
                    >

                        Projects That Create

                        <span className="gradient-text">
                            {" "}Real Impact
                        </span>

                    </h2>


                    <p
                        className="
                        mt-6
                        text-lg
                        text-slate-600
                        "
                    >
                        From startups to enterprises, we build
                        scalable digital solutions that solve
                        real business problems.
                    </p>


                </motion.div>





                {/* Cards */}


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
                                staggerChildren: 0.12,
                            }
                        }
                    }}

                    className="
                    mt-16
                    grid
                    gap-8
                    md:grid-cols-2
                    lg:grid-cols-3
                    "

                >


                    {projects.map((project, index) => {


                        const Icon =
                            icons[index % icons.length];


                        return (

                            <motion.div

                                key={project.title}

                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 40,
                                    },

                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                    }
                                }}

                                whileHover={{
                                    y: -10,
                                }}

                            >


                                <GlassCard

                                    className="
                                    group
                                    relative
                                    overflow-hidden
                                    transition-all
                                    duration-300
                                    "

                                >


                                    {/* Glow */}

                                    <div
                                        className="
                                        absolute
                                        -right-16
                                        -top-16
                                        h-40
                                        w-40
                                        rounded-full
                                        bg-blue-400/20
                                        blur-3xl
                                        transition
                                        group-hover:bg-violet-400/30
                                        "
                                    />




                                    {/* Icon */}


                                    <div
                                        className="
                                        relative
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-gradient-to-br
                                        from-blue-600
                                        to-violet-600
                                        text-white
                                        shadow-lg
                                        "
                                    >

                                        <Icon size={32} />

                                    </div>





                                    <div className="mt-6">


                                        <span
                                            className="
                                            rounded-full
                                            bg-blue-100
                                            px-3
                                            py-1
                                            text-xs
                                            font-medium
                                            text-blue-700
                                            "
                                        >
                                            {project.category}
                                        </span>



                                        <h3
                                            className="
                                            mt-5
                                            text-xl
                                            font-bold
                                            "
                                        >
                                            {project.title}
                                        </h3>



                                        <p
                                            className="
                                            mt-3
                                            text-sm
                                            leading-6
                                            text-slate-600
                                            "
                                        >
                                            {project.description}
                                        </p>




                                        <div
                                            className="
                                            mt-6
                                            flex
                                            flex-wrap
                                            gap-2
                                            "
                                        >

                                            {project.technologies.map(
                                                (tech) => (
                                                    <span
                                                        key={tech}
                                                        className="
                                                        rounded-full
                                                        border
                                                        border-white/50
                                                        bg-white/50
                                                        px-3
                                                        py-1
                                                        text-xs
                                                        text-slate-700
                                                        "
                                                    >
                                                        {tech}
                                                    </span>
                                                )
                                            )}

                                        </div>


                                    </div>


                                </GlassCard>


                            </motion.div>

                        );


                    })}


                </motion.div>


            </Container>

        </Section>

    );

}