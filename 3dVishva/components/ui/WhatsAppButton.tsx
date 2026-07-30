"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";


export default function WhatsAppButton() {


    const whatsappNumber = "917276209570";


    const message =
        "Hello 3DVishva Software Solutions, I would like to know more about your services.";


    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
        )}`;



    return (

        <motion.a

            href={whatsappUrl}

            target="_blank"

            rel="noopener noreferrer"


            initial={{
                opacity: 0,
                scale: 0.5,
            }}

            animate={{
                opacity: 1,
                scale: 1,
            }}

            transition={{
                delay: 1,
                type: "spring",
            }}


            whileHover={{
                scale: 1.12,
            }}

            whileTap={{
                scale: 0.95,
            }}


            className="
            fixed
            bottom-6
            right-6
            z-[60]
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-[#25D366]
            text-white
            shadow-2xl
            shadow-green-500/40
            "

            aria-label="Chat on WhatsApp"

        >


            <FaWhatsapp
                size={38}
            />



            <span
                className="
                absolute
                inset-0
                -z-10
                animate-ping
                rounded-full
                bg-[#25D366]
                opacity-30
                "
            />


        </motion.a>

    );

}