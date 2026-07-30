import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import GlassCard from "@/components/ui/GlassCard";

import { services } from "@/constants/services";

import StaggerContainer from "@/components/animations/StaggerContainer";
import MotionCard from "@/components/animations/MotionCard";


export default function Services() {
    return (
        <Section>
            <Container>

                <div className="mx-auto max-w-3xl text-center">

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

                        Our Services

                    </span>


                    <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">

                        Technology Solutions

                        <span className="gradient-text">
                            {" "}Built For Growth
                        </span>

                    </h2>


                    <p className="mt-6 text-lg text-slate-600">

                        From websites to cloud infrastructure,
                        we help businesses transform ideas into
                        powerful digital products.

                    </p>

                </div>



                <StaggerContainer
                    className="
                    mt-16
                    grid
                    gap-8
                    md:grid-cols-2
                    lg:grid-cols-3
                    "
                >

                    {services.map((service) => {

                        const Icon = service.icon;


                        return (

                            <MotionCard
                                key={service.title}
                            >

                                <GlassCard
                                    className="
                                    group
                                    relative
                                    overflow-hidden
                                    transition-all
                                    duration-300
                                    hover:-translate-y-3
                                    "
                                >


                                    {/* Glow Effect */}

                                    <div
                                        className="
                                        absolute
                                        -right-10
                                        -top-10
                                        h-32
                                        w-32
                                        rounded-full
                                        bg-blue-400/20
                                        blur-3xl
                                        transition
                                        group-hover:bg-violet-400/30
                                        "
                                    />



                                    <div className="relative">


                                        {/* Icon */}

                                        <div
                                            className="
                                            flex
                                            h-14
                                            w-14
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

                                            <Icon size={28} />

                                        </div>



                                        {/* Title */}

                                        <h3
                                            className="
                                            mt-8
                                            text-2xl
                                            font-bold
                                            "
                                        >
                                            {service.title}
                                        </h3>



                                        {/* Description */}

                                        <p
                                            className="
                                            mt-4
                                            leading-7
                                            text-slate-600
                                            "
                                        >
                                            {service.description}
                                        </p>




                                        {/* Features */}

                                        <ul
                                            className="
                                            mt-6
                                            space-y-3
                                            "
                                        >

                                            {service.features.map((feature) => (

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
                                                        h-2
                                                        w-2
                                                        rounded-full
                                                        bg-blue-600
                                                        "
                                                    />

                                                    {feature}

                                                </li>

                                            ))}

                                        </ul>


                                    </div>


                                </GlassCard>


                            </MotionCard>

                        );

                    })}


                </StaggerContainer>


            </Container>
        </Section>
    );
}