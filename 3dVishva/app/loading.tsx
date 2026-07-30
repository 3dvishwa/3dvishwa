import Container from "@/components/layout/Container";


export default function Loading() {

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
                    flex
                    max-w-md
                    flex-col
                    items-center
                    rounded-[32px]
                    p-10
                    text-center
                    "
                >


                    <div
                        className="
                        mb-6
                        h-16
                        w-16
                        animate-pulse
                        rounded-full
                        bg-gradient-to-br
                        from-blue-600
                        via-violet-600
                        to-cyan-500
                        "
                    />


                    <h1
                        className="
                        text-3xl
                        font-extrabold
                        gradient-text
                        "
                    >
                        3DVishva
                    </h1>


                    <p
                        className="
                        mt-4
                        text-slate-600
                        "
                    >
                        Building Digital Products...
                    </p>


                    <div
                        className="
                        mt-8
                        h-1
                        w-48
                        overflow-hidden
                        rounded-full
                        bg-slate-200
                        "
                    >

                        <div
                            className="
                            h-full
                            w-1/2
                            animate-[loading_1.5s_ease-in-out_infinite]
                            rounded-full
                            bg-gradient-to-r
                            from-blue-600
                            to-violet-600
                            "
                        />

                    </div>


                </div>


            </Container>


        </main>

    );
}