import Container from "../../components/layout/Container";

export default function PrivacyPolicy() {

    return (

        <main className="py-20">

            <Container>

                <div className="glass rounded-[32px] p-8 md:p-12">

                    <h1 className="text-4xl font-bold">
                        Privacy Policy
                    </h1>


                    <p className="mt-6 leading-8 text-slate-600">

                        At 3DVishva Software Solutions, we respect your
                        privacy and are committed to protecting your
                        personal information.

                    </p>


                    <h2 className="mt-8 text-2xl font-bold">
                        Information We Collect
                    </h2>


                    <p className="mt-3 text-slate-600 leading-7">

                        We may collect information such as your name,
                        email address, phone number, company details,
                        and project requirements when you contact us.

                    </p>


                    <h2 className="mt-8 text-2xl font-bold">
                        How We Use Information
                    </h2>


                    <p className="mt-3 text-slate-600 leading-7">

                        Information is used only to communicate with
                        clients, provide services, improve our solutions,
                        and respond to inquiries.

                    </p>


                    <h2 className="mt-8 text-2xl font-bold">
                        Data Security
                    </h2>


                    <p className="mt-3 text-slate-600 leading-7">

                        We take reasonable technical and organizational
                        measures to protect your information.

                    </p>


                </div>

            </Container>

        </main>

    );
}