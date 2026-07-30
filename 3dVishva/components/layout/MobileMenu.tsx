"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";

import { navigation } from "../../constants/navigation";


interface MobileMenuProps {

    open: boolean;

    onClose: () => void;

}



export default function MobileMenu({
    open,
    onClose,
}: MobileMenuProps) {


    useEffect(() => {

        if (open) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }


        return () => {

            document.body.style.overflow = "";

        };


    }, [open]);




    useEffect(() => {


        const handleEscape = (
            event: KeyboardEvent
        ) => {

            if (
                event.key === "Escape" &&
                open
            ) {

                onClose();

            }

        };


        window.addEventListener(
            "keydown",
            handleEscape
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handleEscape
            );

        };


    }, [open, onClose]);




    return (

        <>


            {/* Overlay */}

            <div
                onClick={onClose}

                className={`
                fixed
                inset-0
                z-40
                bg-slate-900/30
                backdrop-blur-sm
                transition-opacity
                duration-300

                ${open
                        ?
                        "opacity-100"
                        :
                        "pointer-events-none opacity-0"
                    }
                `}
            />




            {/* Drawer */}


            <aside

                className={`
                fixed
                right-0
                top-0
                z-50
                h-screen
                w-[85%]
                max-w-sm

                glass

                rounded-l-[32px]

                p-6

                transition-transform
                duration-300
                ease-out

                ${open
                        ?
                        "translate-x-0"
                        :
                        "translate-x-full"
                    }

                `}

            >


                <div
                    className="
                    flex
                    items-center
                    justify-between
                    "
                >

                    <h2
                        className="
                        text-xl
                        font-bold
                        "
                    >
                        3DVishva
                    </h2>


                    <button

                        aria-label="Close menu"

                        onClick={onClose}

                        className="
                        rounded-full
                        bg-white/60
                        p-2
                        transition
                        hover:bg-white
                        "

                    >

                        <X size={22} />

                    </button>


                </div>





                <nav
                    className="
                    mt-10
                    flex
                    flex-col
                    gap-6
                    "
                >


                    {navigation.map((item) => (


                        <Link

                            key={item.href}

                            href={item.href}

                            onClick={onClose}

                            className="
                            text-lg
                            font-medium
                            text-slate-700
                            transition
                            hover:text-blue-600
                            "

                        >

                            {item.title}

                        </Link>


                    ))}


                </nav>





                <Link

                    href="#contact"

                    onClick={onClose}

                    className="
                    mt-10
                    block
                    rounded-full
                    bg-blue-600
                    px-6
                    py-4
                    text-center
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                    "

                >

                    Get Started

                </Link>




            </aside>


        </>

    );

}