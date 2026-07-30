"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";



const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "info.3dvishwa@gmail.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+91 7276209570",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Pune, Maharashtra, India",
    },
];



export default function Contact() {


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });



    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };



    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        const whatsappNumber =
            "917276209570";


        const message = `
Hello 3DVishva Software Solutions,

Name:
${formData.name}

Email:
${formData.email}

Company:
${formData.company}

Project Details:
${formData.message}

I would like to discuss my project.
        `;



        const whatsappUrl =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                message
            )}`;



        window.open(
            whatsappUrl,
            "_blank"
        );

    };



    return (

        <Section>


            <Container>


                <div
                    className="
    glass
    overflow-hidden
    rounded-[32px]
    p-8
    md:p-12
    "
                >


                    <div
                        className="
                        grid
                        gap-12
                        lg:grid-cols-2
                        "
                    >



                        {/* LEFT CONTENT */}


                        <motion.div

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
                                duration: 0.7,
                            }}

                        >


                            <span
                                className="
                                inline-flex
                                rounded-full
                                bg-blue-100
                                px-5
                                py-2
                                text-sm
                                font-medium
                                text-blue-700
                                "
                            >

                                Contact Us

                            </span>



                            <h2
                                className="
                                mt-6
                                text-4xl
                                font-bold
                                md:text-5xl
                                "
                            >

                                Let's Build Your

                                <span className="gradient-text">
                                    {" "}Next Digital Product
                                </span>

                            </h2>



                            <p
                                className="
                                mt-6
                                text-lg
                                leading-8
                                text-slate-600
                                "
                            >

                                Have an idea or project in mind?
                                Our team is ready to help you create
                                scalable software solutions.

                            </p>





                            <div
                                className="
                                mt-10
                                space-y-5
                                "
                            >

                                {contactInfo.map(
                                    (item, index) => {

                                        const Icon =
                                            item.icon;


                                        return (

                                            <motion.div

                                                key={item.label}

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
                                                    delay: index * 0.15,
                                                }}

                                                whileHover={{
                                                    x: 8,
                                                }}

                                                className="
                                            flex
                                            items-center
                                            gap-4
                                            "
                                            >

                                                <div
                                                    className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-blue-100
                                                text-blue-600
                                                "
                                                >

                                                    <Icon />

                                                </div>


                                                <div>

                                                    <p className="text-sm text-slate-500">
                                                        {item.label}
                                                    </p>

                                                    <p className="font-medium">
                                                        {item.value}
                                                    </p>

                                                </div>


                                            </motion.div>

                                        );

                                    })}


                            </div>


                        </motion.div>







                        {/* FORM */}



                        <motion.form

                            onSubmit={handleSubmit}

                            initial={{
                                opacity: 0,
                                x: 40,
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
                                duration: 0.7,
                            }}


                            className="
                            space-y-5
                            rounded-3xl
                            border
                            border-white/50
                            bg-white/40
                            p-6
                            md:p-8
                            "

                        >


                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}

                                required

                                type="text"
                                placeholder="Your Name"

                                className="
                                w-full
                                rounded-2xl
                                border
                                border-white/60
                                bg-white/70
                                px-5
                                py-4
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                "
                            />



                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}

                                required

                                type="email"
                                placeholder="Email Address"

                                className="
                                w-full
                                rounded-2xl
                                border
                                border-white/60
                                bg-white/70
                                px-5
                                py-4
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                "
                            />



                            <input
                                name="company"
                                value={formData.company}
                                onChange={handleChange}

                                type="text"
                                placeholder="Company Name"

                                className="
                                w-full
                                rounded-2xl
                                border
                                border-white/60
                                bg-white/70
                                px-5
                                py-4
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                "
                            />



                            <textarea

                                name="message"

                                value={formData.message}

                                onChange={handleChange}

                                required

                                rows={5}

                                placeholder="Tell us about your project..."

                                className="
                                w-full
                                resize-none
                                rounded-2xl
                                border
                                border-white/60
                                bg-white/70
                                px-5
                                py-4
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                "

                            />





                            <motion.button

                                type="submit"

                                whileHover={{
                                    y: -3,
                                }}

                                whileTap={{
                                    scale: 0.97,
                                }}

                                className="
                                w-full
                                rounded-full
                                bg-blue-600
                                px-6
                                py-4
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                                "

                            >

                                Send Message

                            </motion.button>



                        </motion.form>



                    </div>


                </div>


            </Container>


        </Section>

    );

}