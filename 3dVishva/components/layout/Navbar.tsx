"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import Container from "./Container";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

import { navigation } from "../../constants/navigation";


export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    const [active, setActive] = useState("#home");



    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };


        window.addEventListener(
            "scroll",
            handleScroll
        );


        handleScroll();



        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        const observer =
            new IntersectionObserver(

                (entries) => {

                    const visibleSection =
                        entries.find(
                            (entry) =>
                                entry.isIntersecting
                        );


                    if (visibleSection) {

                        setActive(
                            `#${visibleSection.target.id}`
                        );

                    }

                },

                {
                    threshold: 0.35,
                    rootMargin:
                        "-100px 0px -50% 0px",
                }

            );



        sections.forEach((section) => {

            observer.observe(section);

        });



        const handleEscape = (event: KeyboardEvent) => {

            if (event.key === "Escape") {

                setMenuOpen(false);

            }

        };


        window.addEventListener(
            "keydown",
            handleEscape
        );



        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );


            window.removeEventListener(
                "keydown",
                handleEscape
            );


            sections.forEach((section) => {

                observer.unobserve(section);

            });

        };


    }, []);




    return (

        <>

            <header
                className="
                fixed
                left-0
                top-0
                z-50
                h-24
                w-full
                "
            >

                <Container className="pt-4">


                    <div
                        className={`
    glass
    flex
    h-20
    items-center
    justify-between
    rounded-full
    px-8
    transition-all
    duration-300
    ${scrolled
                                ? "shadow-2xl"
                                : "shadow-lg"
                            }
    `}
                    >
                        <Logo />

                        <nav
                            className="
        hidden
        items-center
        gap-10
        md:flex
        "
                        >
                            {navigation.map((item) => {

                                const isActive = active === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        aria-current={
                                            isActive
                                                ? "page"
                                                : undefined
                                        }
                                        className={`
                    transition-colors
                    duration-200
                    ${isActive
                                                ? "font-semibold text-blue-600"
                                                : "text-slate-700 hover:text-blue-600"
                                            }
                    `}
                                    >
                                        {item.title}
                                    </Link>
                                );

                            })}
                        </nav>


                        <div className="hidden md:block">
                            <Link
                                href="#contact"
                                className="
            rounded-full
            bg-blue-600
            px-7
            py-3
            font-medium
            text-white
            transition
            hover:-translate-y-1
            hover:bg-blue-700
            "
                            >
                                Get Started
                            </Link>
                        </div>


                        <button
                            aria-label="Open menu"
                            className="md:hidden"
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu size={26} />
                        </button>

                    </div>


                </Container>


            </header>



            <MobileMenu

                open={menuOpen}

                onClose={() =>
                    setMenuOpen(false)
                }

            />


        </>

    );

}