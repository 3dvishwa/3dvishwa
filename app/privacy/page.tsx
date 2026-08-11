
import { ShieldCheck, ArrowLeft, LockKeyhole, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | 3D Vishwa",
    description:
        "Privacy Policy explaining how 3D Vishwa collects, uses, and protects personal information.",
};

const sections = [
    {
        number: "01",
        title: "Who We Are",
        content: (
            <>
                <p>
                    3D Vishwa is operated as a sole proprietorship and provides
                    an online platform for discovering and purchasing physical
                    3D-printed and related products.
                </p>

                <div className="mt-5 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03] p-5">
                    <div className="grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                Business Name
                            </span>
                            <p className="mt-1 text-slate-200">3D Vishwa</p>
                        </div>

                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                Business Type
                            </span>
                            <p className="mt-1 text-slate-200">
                                Sole Proprietorship
                            </p>
                        </div>

                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                Legal Operator
                            </span>
                            <p className="mt-1 text-slate-200">
                                [FULL LEGAL NAME / PROPRIETOR NAME]
                            </p>
                        </div>

                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                Email
                            </span>
                            <p className="mt-1 text-slate-200">
                                [PRIVACY / CONTACT EMAIL]
                            </p>
                        </div>

                        <div className="sm:col-span-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                Business Address
                            </span>
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
        title: "Information We Collect",
        content: (
            <>
                <p>
                    Depending on how you use the Platform, we may collect the
                    following categories of information.
                </p>

                <InfoGroup
                    title="Account Information"
                    items={[
                        "Name",
                        "Email address",
                        "Telephone number",
                        "Login or authentication information",
                        "Account preferences",
                    ]}
                />

                <InfoGroup
                    title="Order Information"
                    items={[
                        "Name",
                        "Billing address",
                        "Shipping address",
                        "Email address",
                        "Telephone number",
                        "Order details",
                        "Transaction details",
                        "Delivery information",
                        "Communications relating to your order",
                    ]}
                />

                <Subsection title="Payment Information">
                    <p>
                        Payments may be processed through third-party payment
                        providers. Depending on the payment method, those
                        providers may process payment card, bank, UPI, or other
                        payment information.
                    </p>
                    <p>
                        We generally receive information necessary to confirm
                        and reconcile a transaction rather than storing
                        complete payment credentials ourselves.
                    </p>
                </Subsection>

                <Subsection title="Communications">
                    <p>
                        If you contact us by email, contact form, enquiry form,
                        telephone, or another supported channel, we may collect
                        the information you provide and information necessary
                        to respond.
                    </p>
                </Subsection>

                <Subsection title="Technical Information">
                    <p>
                        When you access the Platform, certain technical
                        information may be collected automatically, such as IP
                        address, browser type, device type, operating system,
                        pages visited, approximate access time, referring
                        pages, and technical logs.
                    </p>
                </Subsection>
            </>
        ),
    },
    {
        number: "03",
        title: "How We Use Personal Information",
        content: (
            <>
                <p>We may use personal information to:</p>

                <BulletList
                    items={[
                        "Create and manage accounts.",
                        "Process and fulfil orders.",
                        "Arrange shipping and delivery.",
                        "Process payments.",
                        "Provide customer support.",
                        "Respond to enquiries.",
                        "Communicate about orders and services.",
                        "Prevent fraud and misuse.",
                        "Maintain Platform security.",
                        "Troubleshoot technical problems.",
                        "Improve our products and services.",
                        "Understand Platform usage.",
                        "Comply with legal obligations.",
                        "Establish, exercise, or defend legal claims.",
                    ]}
                />
            </>
        ),
    },
    {
        number: "04",
        title: "Cookies and Similar Technologies",
        content: (
            <>
                <p>
                    The Platform may use cookies and similar technologies for
                    purposes such as maintaining shopping-cart functionality,
                    keeping users signed in, remembering preferences, measuring
                    performance, understanding website usage, and improving
                    security.
                </p>
                <p>
                    Third-party services integrated into the Platform may also
                    use cookies or similar technologies according to their own
                    policies.
                </p>
                <p>
                    You can control certain cookies through your browser
                    settings. Disabling certain cookies may affect Platform
                    functionality.
                </p>
            </>
        ),
    },
    {
        number: "05",
        title: "Sharing Personal Information",
        content: (
            <>
                <p>
                    We may share personal information with service providers
                    and other parties where reasonably necessary to operate the
                    Platform and fulfil your requests.
                </p>

                <p>These may include:</p>

                <BulletList
                    items={[
                        "Payment processors.",
                        "Courier and shipping providers.",
                        "Hosting and infrastructure providers.",
                        "Email and communication providers.",
                        "Authentication providers.",
                        "Analytics providers.",
                        "Security and fraud-prevention providers.",
                        "Professional advisers.",
                        "Government or regulatory authorities where required by law.",
                    ]}
                />

                <p>
                    We do not sell your personal information as a standalone
                    commercial product.
                </p>
            </>
        ),
    },
    {
        number: "06",
        title: "Legal and Regulatory Requirements",
        content: (
            <p>
                We may collect, use, preserve, or disclose information where
                reasonably necessary to comply with applicable law, respond to
                lawful requests, comply with court or government orders,
                prevent fraud or abuse, protect rights or safety, or establish,
                exercise, or defend legal claims.
            </p>
        ),
    },
    {
        number: "07",
        title: "Data Retention",
        content: (
            <>
                <p>
                    We retain personal information only for as long as
                    reasonably necessary for the purposes described in this
                    Privacy Policy, including fulfilling orders, maintaining
                    transaction records, providing customer support, resolving
                    disputes, preventing fraud, complying with tax and
                    accounting obligations, and enforcing our agreements.
                </p>
                <p>
                    When personal information is no longer required, we may
                    delete, anonymise, or securely dispose of it, subject to
                    applicable legal and operational requirements.
                </p>
            </>
        ),
    },
    {
        number: "08",
        title: "Data Security",
        content: (
            <>
                <p>
                    We use reasonable technical and organisational measures
                    designed to protect personal information against
                    unauthorised access, loss, misuse, alteration, or
                    disclosure.
                </p>
                <p>
                    However, no internet transmission or electronic storage
                    system can be guaranteed to be completely secure.
                </p>
            </>
        ),
    },
    {
        number: "09",
        title: "Third-Party Services",
        content: (
            <>
                <p>
                    The Platform may rely on third-party providers for hosting,
                    payment processing, shipping, analytics, authentication,
                    communications, and other services.
                </p>
                <p>
                    These providers may process information according to their
                    own privacy policies and applicable contractual
                    arrangements.
                </p>
            </>
        ),
    },
    {
        number: "10",
        title: "Children's Privacy",
        content: (
            <>
                <p>
                    The Platform is intended for general consumers and is not
                    specifically directed at children.
                </p>
                <p>
                    We do not knowingly seek to collect personal information
                    from children where doing so would be prohibited by
                    applicable law.
                </p>
            </>
        ),
    },
    {
        number: "11",
        title: "Your Privacy Rights",
        content: (
            <>
                <p>
                    Depending on applicable law, you may have rights relating
                    to your personal information, including rights to request
                    access, correction, deletion where legally applicable,
                    information about processing, and other applicable privacy
                    rights.
                </p>

                <p>
                    You may also have the right to withdraw consent where
                    processing is based on consent, subject to applicable law.
                </p>

                <p>
                    To exercise an applicable privacy right, contact us using
                    the details provided below. We may need to verify your
                    identity before processing certain requests.
                </p>
            </>
        ),
    },
    {
        number: "12",
        title: "Consent",
        content: (
            <>
                <p>
                    Where we rely on consent as the basis for processing
                    personal information, you may withdraw that consent where
                    permitted by applicable law.
                </p>
                <p>
                    Withdrawal of consent does not affect processing that was
                    lawfully carried out before withdrawal.
                </p>
            </>
        ),
    },
    {
        number: "13",
        title: "International Data Transfers",
        content: (
            <>
                <p>
                    Some service providers used by the Platform may process
                    information outside India.
                </p>
                <p>
                    Where personal information is transferred or processed
                    outside India, we will do so in accordance with applicable
                    law and requirements that apply to such transfers.
                </p>
            </>
        ),
    },
    {
        number: "14",
        title: "Marketing Communications",
        content: (
            <>
                <p>
                    Where permitted by law and, where required, with your
                    consent, we may send promotional communications about
                    products, offers, or services.
                </p>
                <p>
                    You may opt out of marketing communications by following
                    the unsubscribe instructions in the communication or
                    contacting us.
                </p>
                <p>
                    Transactional communications relating to orders, payments,
                    security, or your account may still be sent where necessary.
                </p>
            </>
        ),
    },
    {
        number: "15",
        title: "External Links",
        content: (
            <p>
                The Platform may contain links to websites operated by third
                parties. We are not responsible for the privacy practices or
                content of those websites.
            </p>
        ),
    },
    {
        number: "16",
        title: "Changes to This Privacy Policy",
        content: (
            <>
                <p>
                    We may update this Privacy Policy from time to time to
                    reflect changes to our services, technology, legal
                    requirements, or privacy practices.
                </p>
                <p>
                    The updated policy will be published on the Platform with a
                    revised &quot;Last Updated&quot; date.
                </p>
            </>
        ),
    },
];

function InfoGroup({
    title,
    items,
}: {
    title: string;
    items: string[];
}) {
    return (
        <div className="mt-7">
            <h3 className="text-sm font-bold text-slate-200">{title}</h3>
            <BulletList items={items} />
        </div>
    );
}

function Subsection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mt-7">
            <h3 className="text-sm font-bold text-slate-200">{title}</h3>
            <div className="mt-2">{children}</div>
        </div>
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
                    <span className="absolute left-0 top-[13px] h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default function PrivacyPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#090D16] px-4 py-6 text-slate-300 sm:px-6 sm:py-10">
            {/* Background Grid */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_35%,#000_65%,transparent_100%)]" />

            {/* Neon Glows */}
            <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[130px]" />

            <div className="relative z-10 mx-auto w-full max-w-4xl">
                {/* Header */}
                <header className="mb-8 flex items-center justify-between">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-white/[0.03] shadow-[0_0_20px_rgba(6,182,212,0.12)]">
                            <ShieldCheck className="h-5 w-5 text-cyan-400" />
                        </div>

                        <div>
                            <div className="font-mono text-sm font-extrabold tracking-tight text-white uppercase">
                                3D <span className="text-cyan-400">Vishwa</span>
                            </div>
                            <div className="text-[9px] font-mono tracking-[0.2em] text-slate-500 uppercase">
                                Privacy & Security
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/"
                        className="group hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 transition-all hover:border-cyan-500/30 hover:text-cyan-400 sm:inline-flex"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Back
                    </Link>
                </header>

                {/* Hero */}
                <section className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.12)] sm:flex">
                            <LockKeyhole className="h-5 w-5" />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">
                                <FileText className="h-3 w-3" />
                                Legal Document / 01
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Privacy{" "}
                                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                                    Policy
                                </span>
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                                How 3D Vishwa collects, uses, stores, and
                                protects your personal information across our
                                platform and online store.
                            </p>

                            <div className="mt-5 inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-mono text-slate-500">
                                LAST UPDATED: AUGUST 11, 2026
                            </div>
                        </div>
                    </div>
                </section>

                {/* Policy Content */}
                <div className="space-y-4">
                    {sections.map((section) => (
                        <section
                            key={section.number}
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 shadow-xl backdrop-blur-xl transition-colors hover:border-cyan-500/15 sm:p-8"
                        >
                            <div className="flex gap-5">
                                <div className="hidden shrink-0 pt-1 font-mono text-xs font-bold text-cyan-400/70 sm:block">
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
                    <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.06] via-white/[0.02] to-violet-500/[0.04] p-6 shadow-[0_0_30px_rgba(6,182,212,0.06)] backdrop-blur-xl sm:p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                    17 / Contact
                                </span>
                                <h2 className="text-xl font-extrabold text-white">
                                    Privacy & Grievance Requests
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
                            Email: [PRIVACY / GRIEVANCE EMAIL]
                            <br />
                            Phone: [CONTACT PHONE, IF APPLICABLE]
                        </div>

                        <p className="mt-5 text-sm leading-7 text-slate-400">
                            For privacy questions, requests, or complaints,
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
                                className="text-[10px] font-mono text-slate-500 transition-colors hover:text-cyan-400"
                            >
                                Terms of Service
                            </Link>

                            <span className="text-slate-700">•</span>

                            <Link
                                href="/privacy"
                                className="text-[10px] font-mono text-cyan-400"
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

