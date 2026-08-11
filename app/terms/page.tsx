
import {
    ArrowLeft,
    FileText,
    Scale,
    ShieldCheck,
    ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Terms of Service | 3D Vishwa",
    description:
        "Terms of Service governing the use of 3D Vishwa and purchases made through our online store.",
};

const sections = [
    {
        number: "01",
        title: "About 3D Vishwa",
        content: (
            <>
                <p>
                    3D Vishwa is an online platform for discovering and
                    purchasing physical 3D-printed and related products.
                </p>

                <div className="mt-5 rounded-xl border border-violet-500/15 bg-violet-500/[0.03] p-5">
                    <div className="grid gap-4 text-sm sm:grid-cols-2">
                        <div>
                            <Label>Legal Operator</Label>
                            <p className="mt-1 text-slate-200">
                                [FULL LEGAL NAME / PROPRIETOR NAME]
                            </p>
                        </div>

                        <div>
                            <Label>Business Name</Label>
                            <p className="mt-1 text-slate-200">
                                3D Vishwa
                            </p>
                        </div>

                        <div>
                            <Label>Business Type</Label>
                            <p className="mt-1 text-slate-200">
                                Sole Proprietorship
                            </p>
                        </div>

                        <div>
                            <Label>Email</Label>
                            <p className="mt-1 text-slate-200">
                                [CONTACT EMAIL]
                            </p>
                        </div>

                        <div className="sm:col-span-2">
                            <Label>Address</Label>
                            <p className="mt-1 text-slate-200">
                                [FULL BUSINESS ADDRESS]
                            </p>
                        </div>
                    </div>
                </div>
            </>
        ),
    },

    {
        number: "02",
        title: "Eligibility",
        content: (
            <>
                <p>
                    You may use the Platform only if you are legally capable
                    of entering into a binding agreement under applicable law.
                </p>

                <p>
                    If you are under the age required to enter into contracts
                    under applicable law, you should use the Platform only
                    with the involvement and consent of a parent or legal
                    guardian.
                </p>
            </>
        ),
    },

    {
        number: "03",
        title: "Products",
        content: (
            <>
                <p>
                    We make reasonable efforts to ensure that product
                    descriptions, photographs, dimensions, colours, materials,
                    and other product information displayed on the Platform
                    are accurate.
                </p>

                <p>
                    Physical 3D-printed products may have minor variations in
                    colour, surface finish, texture, dimensions, layer lines,
                    and appearance. Such variations may occur because of the
                    3D-printing process, materials, lighting, display
                    settings, and reasonable manufacturing tolerances.
                </p>

                <p>
                    Product images may therefore differ slightly from the
                    physical product received.
                </p>
            </>
        ),
    },

    {
        number: "04",
        title: "Product Availability",
        content: (
            <>
                <p>Products are subject to availability.</p>

                <p>We reserve the right to:</p>

                <BulletList
                    items={[
                        "Limit quantities.",
                        "Discontinue products.",
                        "Modify product specifications.",
                        "Correct pricing or listing errors.",
                        "Cancel an order where reasonably necessary.",
                    ]}
                />

                <p>
                    If an order is cancelled by us after payment has been
                    received, any eligible refund will be processed using the
                    applicable payment method or another appropriate method.
                </p>
            </>
        ),
    },

    {
        number: "05",
        title: "Prices and Taxes",
        content: (
            <>
                <p>
                    Prices displayed on the Platform are stated in Indian
                    Rupees (INR), unless otherwise indicated.
                </p>

                <p>
                    Applicable taxes, shipping charges, or other charges will
                    be displayed during the purchasing process where
                    applicable.
                </p>

                <p>
                    We may change product prices at any time. A price change
                    will not affect an order that has already been accepted,
                    except where cancellation or correction is required due
                    to an obvious pricing or listing error.
                </p>
            </>
        ),
    },

    {
        number: "06",
        title: "Orders",
        content: (
            <>
                <p>
                    When you place an order, you are requesting to purchase
                    the selected product.
                </p>

                <p>
                    We may contact you for additional information or cancel an
                    order where there is a legitimate reason to do so.
                </p>

                <p>You are responsible for providing accurate:</p>

                <BulletList
                    items={[
                        "Name.",
                        "Email address.",
                        "Telephone number.",
                        "Billing information.",
                        "Shipping address.",
                    ]}
                />
            </>
        ),
    },

    {
        number: "07",
        title: "Payment",
        content: (
            <>
                <p>
                    Payments may be processed through third-party payment
                    providers. Payment providers may have their own terms and
                    privacy policies.
                </p>

                <p>
                    You agree to provide accurate payment information and to
                    use a payment method that you are authorised to use.
                </p>
            </>
        ),
    },

    {
        number: "08",
        title: "Shipping and Delivery",
        content: (
            <>
                <p>
                    Shipping and estimated delivery information will be
                    provided during the purchasing process or through the
                    applicable shipping information on the Platform.
                </p>

                <p>
                    Delivery times are estimates and may be affected by
                    production time, courier delays, weather, public holidays,
                    incorrect delivery information, or circumstances outside
                    our reasonable control.
                </p>
            </>
        ),
    },

    {
        number: "09",
        title: "Returns, Refunds and Cancellations",
        content: (
            <>
                <p>
                    Returns, refunds, replacements, and cancellations are
                    governed by our applicable Cancellation and Refund Policy.
                </p>

                <p>
                    Nothing in these Terms is intended to remove or restrict
                    any mandatory consumer rights that cannot legally be
                    excluded.
                </p>
            </>
        ),
    },

    {
        number: "10",
        title: "Personalised or Custom Products",
        content: (
            <>
                <p>
                    If we offer personalised or custom-made products, you are
                    responsible for ensuring that the information, names,
                    photographs, text, designs, or other content supplied by
                    you is accurate and that you have the necessary rights or
                    permissions to provide it.
                </p>

                <p>
                    Custom products may be subject to different cancellation,
                    return, or refund conditions where permitted by applicable
                    law and our applicable policy.
                </p>
            </>
        ),
    },

    {
        number: "11",
        title: "User Accounts",
        content: (
            <>
                <p>
                    Certain features may require you to create an account. You
                    are responsible for maintaining the confidentiality of
                    your login credentials and keeping your account
                    information accurate.
                </p>

                <p>
                    You should notify us if you believe your account has been
                    compromised.
                </p>
            </>
        ),
    },

    {
        number: "12",
        title: "Prohibited Activities",
        content: (
            <>
                <p>You must not use the Platform to:</p>

                <BulletList
                    items={[
                        "Violate applicable laws or regulations.",
                        "Commit or facilitate fraud.",
                        "Interfere with Platform security or operation.",
                        "Attempt unauthorised access to systems or accounts.",
                        "Upload malicious code or harmful software.",
                        "Misuse another person's account or personal information.",
                        "Scrape or systematically extract Platform content without permission.",
                        "Infringe intellectual-property rights.",
                        "Otherwise misuse the Platform.",
                    ]}
                />
            </>
        ),
    },

    {
        number: "13",
        title: "Intellectual Property",
        content: (
            <>
                <p>
                    The Platform and its content, including text, graphics,
                    logos, photographs, product descriptions, software,
                    designs, layout, and other materials, may be protected by
                    intellectual-property laws.
                </p>

                <p>
                    Purchasing a physical product does not automatically
                    transfer intellectual-property rights in the underlying
                    design, artwork, digital model, or file.
                </p>
            </>
        ),
    },

    {
        number: "14",
        title: "Third-Party Services",
        content: (
            <>
                <p>
                    The Platform may use third-party services such as payment
                    processors, shipping providers, hosting providers,
                    analytics services, authentication services, and
                    communication providers.
                </p>

                <p>
                    Third-party services may have their own terms and privacy
                    policies.
                </p>
            </>
        ),
    },

    {
        number: "15",
        title: "Disclaimer",
        content: (
            <>
                <p>
                    To the extent permitted by applicable law, the Platform
                    and its content are provided on an &quot;as available&quot;
                    basis.
                </p>

                <p>
                    We do not guarantee that the Platform will always be
                    available, error-free, or that all products will always be
                    available.
                </p>

                <p>
                    Nothing in these Terms excludes or limits any liability or
                    consumer right that cannot legally be excluded or limited.
                </p>
            </>
        ),
    },

    {
        number: "16",
        title: "Limitation of Liability",
        content: (
            <>
                <p>
                    To the maximum extent permitted by applicable law, we will
                    not be liable for indirect, incidental, special, or
                    consequential losses arising from your use of the Platform
                    where such limitation is legally permitted.
                </p>

                <p>
                    Nothing in these Terms excludes liability that cannot
                    legally be excluded.
                </p>
            </>
        ),
    },

    {
        number: "17",
        title: "Changes to These Terms",
        content: (
            <p>
                We may update these Terms from time to time. The updated
                version will be published on the Platform with a revised
                &quot;Last Updated&quot; date.
            </p>
        ),
    },

    {
        number: "18",
        title: "Governing Law and Jurisdiction",
        content: (
            <>
                <p>
                    These Terms are governed by the laws of India.
                </p>

                <p>
                    Subject to applicable consumer-protection laws and
                    mandatory jurisdictional requirements, disputes relating
                    to these Terms or the Platform will be subject to the
                    jurisdiction of the courts having appropriate jurisdiction
                    over{" "}
                    <strong className="text-slate-200">
                        [CITY, STATE, INDIA]
                    </strong>
                    .
                </p>
            </>
        ),
    },
];

function Label({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400">
            {children}
        </span>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 space-y-2">
            {items.map((item) => (
                <li
                    key={item}
                    className="relative pl-5 text-sm leading-7 text-slate-400"
                >
                    <span className="absolute left-0 top-[13px] h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.7)]" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default function TermsPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#090D16] px-4 py-6 text-slate-300 sm:px-6 sm:py-10">
            {/* Background Grid */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_35%,#000_65%,transparent_100%)]" />

            {/* Neon Glows */}
            <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

            <div className="relative z-10 mx-auto w-full max-w-4xl">
                {/* Header */}
                <header className="mb-8 flex items-center justify-between">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-white/[0.03] shadow-[0_0_20px_rgba(139,92,246,0.12)]">
                            <Scale className="h-5 w-5 text-violet-400" />
                        </div>

                        <div>
                            <div className="font-mono text-sm font-extrabold tracking-tight text-white uppercase">
                                3D{" "}
                                <span className="text-cyan-400">
                                    Vishwa
                                </span>
                            </div>

                            <div className="text-[9px] font-mono tracking-[0.2em] text-slate-500 uppercase">
                                Terms & Conditions
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/"
                        className="group hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 transition-all hover:border-violet-500/30 hover:text-violet-400 sm:inline-flex"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Back
                    </Link>
                </header>

                {/* Hero */}
                <section className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.12)] sm:flex">
                            <FileText className="h-5 w-5" />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-violet-400">
                                <Scale className="h-3 w-3" />
                                Legal Document / 02
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Terms of{" "}
                                <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                                    Service
                                </span>
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                                The terms and conditions governing access to
                                3D Vishwa and purchases made through our online
                                store.
                            </p>

                            <div className="mt-5 inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-mono text-slate-500">
                                LAST UPDATED: AUGUST 11, 2026
                            </div>
                        </div>
                    </div>
                </section>

                {/* Intro */}
                <section className="mb-4 rounded-2xl border border-cyan-500/15 bg-cyan-500/[0.025] p-6 shadow-xl backdrop-blur-xl sm:p-8">
                    <div className="flex gap-4">
                        <ShoppingBag className="mt-1 hidden h-5 w-5 shrink-0 text-cyan-400 sm:block" />

                        <div className="space-y-4 text-sm leading-7 text-slate-400">
                            <p>
                                Welcome to{" "}
                                <strong className="text-slate-200">
                                    3D Vishwa
                                </strong>{" "}
                                (&quot;3D Vishwa&quot;, &quot;we&quot;,
                                &quot;us&quot;, or &quot;our&quot;). These
                                Terms of Service govern your access to{" "}
                                <strong className="text-cyan-400">
                                    3dvishwa.com
                                </strong>{" "}
                                and our online store at{" "}
                                <strong className="text-cyan-400">
                                    store.3dvishwa.com
                                </strong>{" "}
                                (collectively, the &quot;Platform&quot;).
                            </p>

                            <p>
                                By accessing the Platform, creating an account,
                                placing an order, or otherwise using our
                                services, you agree to these Terms. If you do
                                not agree with these Terms, please do not use
                                the Platform.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Terms Content */}
                <div className="space-y-4">
                    {sections.map((section) => (
                        <section
                            key={section.number}
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 shadow-xl backdrop-blur-xl transition-colors hover:border-violet-500/15 sm:p-8"
                        >
                            <div className="flex gap-5">
                                <div className="hidden shrink-0 pt-1 font-mono text-xs font-bold text-violet-400/70 sm:block">
                                    {section.number}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                                        {section.title}
                                    </h2>

                                    <div className="mt-4 space-y-4 text-sm leading-7 text-slate-400">
                                        {section.content}
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}

                    {/* Contact */}
                    <section className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] via-white/[0.02] to-cyan-500/[0.04] p-6 shadow-[0_0_30px_rgba(139,92,246,0.06)] backdrop-blur-xl sm:p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400">
                                    19 / Contact
                                </span>

                                <h2 className="text-xl font-extrabold text-white">
                                    Contact Us
                                </h2>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-400">
                            <strong className="text-slate-200">
                                3D Vishwa
                            </strong>
                            <br />
                            [PROPRIETOR / LEGAL NAME]
                            <br />
                            [BUSINESS ADDRESS]
                            <br />
                            Email: [CONTACT EMAIL]
                            <br />
                            Phone: [CONTACT PHONE, IF APPLICABLE]
                        </div>

                        <p className="mt-5 text-sm leading-7 text-slate-400">
                            If you have questions regarding these Terms,
                            please contact us using the information provided
                            above.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <footer className="mt-8 border-t border-white/10 pt-6 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
                        <p className="text-[10px] font-mono text-slate-600">
                            © {new Date().getFullYear()} 3DVISHWA ECOSYSTEM.
                            ALL RIGHTS RESERVED.
                        </p>

                        <div className="hidden h-3 w-px bg-white/10 sm:block" />

                        <div className="flex items-center gap-4">
                            <Link
                                href="/terms"
                                className="text-[10px] font-mono text-violet-400"
                            >
                                Terms of Service
                            </Link>

                            <span className="text-slate-700">•</span>

                            <Link
                                href="/privacy"
                                className="text-[10px] font-mono text-slate-500 transition-colors hover:text-cyan-400"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}

