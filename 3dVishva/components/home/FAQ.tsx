"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

import { faqs } from "../../constants/faq";



export default function FAQ() {


    const [open, setOpen] = useState<number | null>(0);



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

                        FAQ

                    </span>




                    <h2
                        className="
                        mt-6
                        text-4xl
                        font-bold
                        md:text-5xl
                        "
                    >

                        Frequently Asked

                        <span className="gradient-text">
                            {" "}Questions
                        </span>


                    </h2>




                    <p
                        className="
                        mt-6
                        text-lg
                        text-slate-600
                        "
                    >

                        Answers to common questions about our
                        services and development process.

                    </p>


                </motion.div>







                {/* FAQ ITEMS */}



                <div
                    className="
                    mx-auto
                    mt-16
                    max-w-4xl
                    space-y-5
                    "
                >



                    {faqs.map(
                        (item, index) => {


                            const active =
                                open === index;



                            return (

                                <motion.div

                                    key={item.question}


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
                                        delay: index * 0.08,
                                    }}


                                    className="
                                glass
                                overflow-hidden
                                rounded-3xl
                                "

                                    whileHover={{
                                        y: -3,
                                    }}

                                >



                                    <button

                                        onClick={() =>
                                            setOpen(
                                                active
                                                    ? null
                                                    : index
                                            )
                                        }


                                        aria-expanded={
                                            active
                                        }


                                        className="
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    px-6
                                    py-6
                                    text-left
                                    "

                                    >



                                        <span
                                            className="
                                        pr-6
                                        font-semibold
                                        "
                                        >

                                            {item.question}

                                        </span>





                                        <span
                                            className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-blue-100
                                        text-blue-600
                                        "
                                        >

                                            {
                                                active
                                                    ?
                                                    <Minus size={18} />
                                                    :
                                                    <Plus size={18} />
                                            }


                                        </span>



                                    </button>







                                    <AnimatePresence
                                        initial={false}
                                    >


                                        {
                                            active && (

                                                <motion.div

                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}

                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}

                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}

                                                    transition={{
                                                        duration: 0.3,
                                                    }}

                                                    className="
                                                overflow-hidden
                                                "

                                                >

                                                    <p
                                                        className="
                                                    px-6
                                                    pb-6
                                                    leading-7
                                                    text-slate-600
                                                    "
                                                    >

                                                        {item.answer}

                                                    </p>


                                                </motion.div>

                                            )
                                        }


                                    </AnimatePresence>




                                </motion.div>


                            );


                        })}



                </div>



            </Container>


        </Section>

    );

}