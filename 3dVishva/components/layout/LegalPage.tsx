import Container from "@/components/layout/Container";

export default function LegalPage({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {

    return (
        <main className="section-padding">

            <Container>

                <div
                    className="
                    glass
                    rounded-[32px]
                    p-8
                    md:p-12
                    "
                >

                    <h1
                        className="
                        text-4xl
                        font-bold
                        md:text-5xl
                        "
                    >
                        {title}
                    </h1>


                    <div
                        className="
                        mt-8
                        space-y-6
                        leading-8
                        text-slate-600
                        "
                    >
                        {children}
                    </div>

                </div>

            </Container>

        </main>
    );
}