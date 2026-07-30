import LegalPage from "../../components/layout/LegalPage";


export const metadata = {
    title: "Data Policy",
};


export default function DataPolicy() {

    return (

        <LegalPage title="Data Policy">

            <p>
                This Data Policy explains how 3DVishva Software Solutions
                handles information collected through our website and services.
            </p>


            <h2 className="text-2xl font-bold text-slate-900">
                Data Collection
            </h2>

            <p>
                We collect only the information required to provide services,
                communicate with clients, and improve user experience.
            </p>


            <h2 className="text-2xl font-bold text-slate-900">
                Data Retention
            </h2>

            <p>
                Client information is retained only for as long as necessary
                for business, legal, and operational purposes.
            </p>


            <h2 className="text-2xl font-bold text-slate-900">
                Third Party Services
            </h2>

            <p>
                We may use trusted third-party tools for hosting, analytics,
                communication, and infrastructure management.
            </p>


            <h2 className="text-2xl font-bold text-slate-900">
                Data Protection
            </h2>

            <p>
                We follow reasonable security practices to protect business
                and customer information.
            </p>

        </LegalPage>

    );
}