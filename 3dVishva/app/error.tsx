"use client";


import { useEffect } from "react";

import Container from "@/components/layout/Container";


export default function ErrorPage({

    reset,

}: {

    reset: () => void;

}) {


    useEffect(() => {

        console.error(
            "Application error occurred"
        );

    }, []);



    return (

        <main
            className="
            flex
            min-h-screen
            items-center
            justify-center
            "
        >

            <Container>


                <div
                    className="
                    glass
                    mx-auto
                    max-w-lg
                    rounded-[32px]
                    p-10
                    text-center
                    "
                >

                    <h1
                        className="
                        text-5xl
                        font-bold
                        gradient-text
                        "
                    >
                        Oops!
                    </h1>


                    <h2
                        className="
                        mt-5
                        text-2xl
                        font-bold
                        "
                    >
                        Something went wrong
                    </h2>


                    <p
                        className="
                        mt-4
                        text-slate-600
                        "
                    >
                        We could not load this page.
                        Please try again.
                    </p>



                    <button
                        onClick={reset}

                        className="
                        mt-8
                        rounded-full
                        bg-blue-600
                        px-8
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                        "
                    >
                        Try Again
                    </button>


                </div>


            </Container>


        </main>

    );

}