import Link from "next/link";

import Container from "../components/layout/Container";


export default function NotFound() {


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
                        text-7xl
                        font-extrabold
                        gradient-text
                        "
                    >
                        404
                    </h1>


                    <h2
                        className="
                        mt-5
                        text-2xl
                        font-bold
                        "
                    >
                        Page Not Found
                    </h2>


                    <p
                        className="
                        mt-4
                        text-slate-600
                        "
                    >
                        The page you are looking for
                        does not exist.
                    </p>



                    <Link

                        href="/"

                        className="
                        mt-8
                        inline-flex
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
                        Back To Home

                    </Link>


                </div>


            </Container>


        </main>

    );

}