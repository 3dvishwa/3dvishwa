"use client";

import Link from "next/link";
import {
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
} from "react-icons/fa";
import Container from "./Container";


const navigation = [
    "Home",
    "Services",
    "About",
    "Portfolio",
    "Pricing",
    "Contact",
];


const services = [
    "Web Development",
    "Mobile Applications",
    "Cloud Solutions",
    "Custom Software",
];





export default function Footer() {

    return (

        <footer className="relative pb-8 pt-20">


            {/* Background Glow */}

            <div
                className="
                absolute
                bottom-0
                left-1/2
                -z-10
                h-96
                w-96
                -translate-x-1/2
                rounded-full
                bg-blue-400/20
                blur-[120px]
                "
            />



            <Container>


                <div
                    className="
                    glass
                    relative
                    overflow-hidden
                    rounded-[36px]
                    p-8
                    md:p-12
                    "
                >


                    <div
                        className="
                        absolute
                        -right-20
                        -top-20
                        h-60
                        w-60
                        rounded-full
                        bg-violet-400/20
                        blur-3xl
                        "
                    />



                    <div
                        className="
                        relative
                        grid
                        gap-12
                        lg:grid-cols-5
                        "
                    >



                        {/* BRAND */}


                        <div className="lg:col-span-2">


                            <h3
                                className="
                                text-3xl
                                font-extrabold
                                gradient-text
                                "
                            >
                                3DVishva
                            </h3>



                            <p
                                className="
                                mt-5
                                max-w-sm
                                leading-7
                                text-slate-600
                                "
                            >
                                Building scalable digital products,
                                modern web platforms, mobile applications,
                                and cloud solutions for ambitious businesses.
                            </p>



                            <div
                                className="
                                mt-6
                                flex
                                gap-3
                                "
                            >

                                {[
                                    {
                                        icon: FaGithub,
                                        href: "#",
                                    },
                                    {
                                        icon: FaLinkedin,
                                        href: "#",
                                    },
                                    {
                                        icon: FaTwitter,
                                        href: "#",
                                    },
                                ].map((item, index) => {

                                    const Icon = item.icon;

                                    return (

                                        <a
                                            key={index}
                                            href={item.href}
                                            className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-white/60
                                            transition
                                            hover:-translate-y-1
                                            hover:bg-blue-100
                                            "
                                        >
                                            <Icon size={18} />
                                        </a>

                                    );

                                })}


                            </div>



                        </div>







                        {/* NAVIGATION */}


                        <div>


                            <h4 className="font-bold">
                                Company
                            </h4>


                            <ul className="mt-5 space-y-3">


                                {navigation.map((item) => (

                                    <li key={item}>


                                        <Link
                                            href={
                                                item === "Home"
                                                    ?
                                                    "#home"
                                                    :
                                                    `#${item.toLowerCase()}`
                                            }

                                            className="
                                            text-slate-600
                                            transition
                                            hover:text-blue-600
                                            "
                                        >
                                            {item}
                                        </Link>


                                    </li>

                                ))}


                            </ul>


                        </div>








                        {/* SERVICES */}


                        <div>


                            <h4 className="font-bold">
                                Services
                            </h4>


                            <ul className="mt-5 space-y-3">


                                {services.map(item => (

                                    <li
                                        key={item}
                                        className="text-slate-600"
                                    >
                                        {item}
                                    </li>

                                ))}


                            </ul>


                        </div>








                        {/* CONTACT */}


                        <div>


                            <h4 className="font-bold">
                                Contact
                            </h4>



                            <div className="mt-5 space-y-4 text-sm">


                                <div className="flex gap-3 text-slate-600">
                                    <Mail size={18} />
                                    info.3dvishwa@gmail.com
                                </div>


                                <div className="flex gap-3 text-slate-600">
                                    <Phone size={18} />
                                    +91 7276209570
                                </div>


                                <div className="flex gap-3 text-slate-600">
                                    <MapPin size={18} />
                                    Pune, Maharashtra, India
                                </div>


                            </div>


                        </div>

                    </div>

                    {/* COPYRIGHT */}

                    <div
                        className="
    mt-10
    border-t
    border-white/50
    pt-6
    flex
    flex-col
    gap-3
    text-center
    text-sm
    text-slate-500
    md:flex-row
    md:items-center
    md:justify-between
    "
                    >

                        <p>
                            © {new Date().getFullYear()} 3DVishva Software Solutions.
                            All rights reserved.
                        </p>


                        <div
                            className="
        flex
        justify-center
        gap-5
        "
                        >

                            <Link
                                href="/privacy-policy"
                                className="
            transition
            hover:text-blue-600
            "
                            >
                                Privacy Policy
                            </Link>


                            <Link
                                href="/data-policy"
                                className="
            transition
            hover:text-blue-600
            "
                            >
                                Data Policy
                            </Link>


                            <Link
                                href="/terms"
                                className="
            transition
            hover:text-blue-600
            "
                            >
                                Terms of Service
                            </Link>

                        </div>


                    </div>



                </div>


            </Container>


        </footer>

    );

}