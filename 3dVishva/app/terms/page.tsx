import LegalPage from "../../components/layout/LegalPage";


export const metadata = {
    title: "Terms of Service",
};


export default function TermsOfService() {

    return (

        <LegalPage title="Terms of Service">

            <p>
                By accessing this website, you agree to these terms and
                conditions.
            </p>


            <h2 className="text-2xl font-bold text-slate-900">
                Services
            </h2>

            <p>
                3DVishva Software Solutions provides software development,
                web development, mobile applications, and technology services.
            </p>


            <h2 className="text-2xl font-bold text-slate-900">
                Project Agreements
            </h2>

            <p>
                Project scope, timelines, pricing, and deliverables are
                defined through individual client agreements.
            </p>


            <h2 className="text-2xl font-bold text-slate-900">
                Intellectual Property
            </h2>

            <p>
                Ownership of delivered software and assets will be handled
                according to the agreed project terms.
            </p>


            <h2 className="text-2xl font-bold text-slate-900">
                Limitation of Liability
            </h2>

            <p>
                We are not responsible for losses caused by misuse,
                third-party services, or circumstances outside our control.
            </p>

        </LegalPage>

    );
}