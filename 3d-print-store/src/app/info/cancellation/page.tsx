"use client";

import { motion, Variants } from "framer-motion";
import Head from "next/head";

export default function Cancellation() {
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
        }),
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RefundPolicy",
        name: "Cancellation and Refund Policy - 3D Vishwa",
        url: "https://3dvishwa.com/info/cancellation",
        description:
            "3D Vishwa’s cancellation and refund policy explains our 10-day return policy, process for refunds, and customer rights for damaged or defective items.",
        publisher: {
            "@type": "Organization",
            name: "3D Vishwa",
            url: "https://3dvishwa.com",
            telephone: "+91 7276209570",
            email: "info.3dvishwa@gmail.com",
        },
    };

    return (
        <>
            <Head>
                <title>Cancellation and Refund Policy | 3D Vishwa</title>
                <meta
                    name="description"
                    content="3D Vishwa offers a 10-day return policy, refund process, and customer rights for damaged or defective items. Learn about cancellations, exchanges, and returns."
                />
                <meta name="robots" content="index, follow" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <main className="max-w-4xl mx-auto py-8 space-y-10 text-[#3E312C] font-sans">
                <div className="text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider shadow-sm">
                        Legal Policy
                    </span>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight"
                    >
                        Cancellation and <span className="text-[#3F5B43]">Refund Policy</span>
                    </motion.h1>
                    <p className="text-xs text-[#65554D]">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                <div className="glass-card rounded-[24px] p-6 sm:p-12 space-y-8">
                    {[
                        {
                            title: "Return Window",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    We have a 10-day return policy, which means you have 10 days after receiving your item to request a return.
                                </p>
                            ),
                        },
                        {
                            title: "Eligibility for Returns",
                            content: (
                                <div className="space-y-4">
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        To start a return, contact us at{" "}
                                        <a
                                            href="mailto:info.3dvishwa@gmail.com"
                                            className="text-[#3F5B43] hover:underline font-medium"
                                        >
                                            info.3dvishwa@gmail.com
                                        </a>
                                        .
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        You will be responsible for paying for your own shipping costs for returning your item, unless the return is due to an error on our part (e.g., defective or wrong item). Shipping costs are non-refundable.
                                    </p>
                                </div>
                            ),
                        },
                        {
                            title: "Damages and Issues",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
                                </p>
                            ),
                        },
                        {
                            title: "Exceptions / Non-Returnable Items",
                            content: (
                                <div className="space-y-4">
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        Certain types of items cannot be returned. Please get in touch if you have questions or concerns about your specific item.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        Unfortunately, we cannot accept returns on sale items or gift cards. Sale items are defined as any products marked with a discounted price at the time of purchase. Items purchased during promotional sales or clearance events are also considered sale items and are non-returnable.
                                    </p>
                                </div>
                            ),
                        },
                        {
                            title: "Exchanges",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                                </p>
                            ),
                        },
                        {
                            title: "10 Day Cooling-Off Period",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    You have the right to cancel or return your order within 10 days, for any reason and without justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
                                </p>
                            ),
                        },
                        {
                            title: "Refunds",
                            content: (
                                <div className="space-y-4">
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
                                    </p>
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        If more than 15 business days have passed since we’ve approved your return, please contact us at{" "}
                                        <a
                                            href="mailto:info.3dvishwa@gmail.com"
                                            className="text-[#3F5B43] hover:underline font-medium"
                                        >
                                            info.3dvishwa@gmail.com
                                        </a>
                                        .
                                    </p>
                                </div>
                            ),
                        },
                        {
                            title: "Time Frame for Response",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    Once we receive your return request, we will respond within 2 business days with further instructions or confirmation of return approval.
                                </p>
                            ),
                        },
                        {
                            title: "International Returns",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    For international returns, the customer is responsible for the cost of return shipping, as well as any duties, taxes, or other customs fees associated with returning the item.
                                </p>
                            ),
                        },
                        {
                            title: "Customized or Personalized Items",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    Customized or personalized items (such as 3D printed products or lithophanes) are non-returnable, unless they are defective or damaged upon receipt.
                                </p>
                            ),
                        },
                        {
                            title: "Your Legal Rights",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    This policy does not affect your statutory rights under applicable consumer protection laws. If you receive a faulty or defective product, you have the right to a full refund or replacement under the law.
                                </p>
                            ),
                        },
                        {
                            title: "Return Inspection",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    Once your return is received, it will be inspected to ensure it meets the conditions outlined above. If your return does not meet our return criteria, we will contact you to arrange a resolution.
                                </p>
                            ),
                        },
                        {
                            title: "Cancellation Before Shipping",
                            content: (
                                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                    If you wish to cancel your order before it has been shipped, please contact us immediately at{" "}
                                    <a
                                        href="mailto:info.3dvishwa@gmail.com"
                                        className="text-[#3F5B43] hover:underline font-medium"
                                    >
                                        info.3dvishwa@gmail.com
                                    </a>
                                    . Once an item has been shipped, the return policy will apply instead of cancellation.
                                </p>
                            ),
                        },
                        {
                            title: "Contact Information",
                            content: (
                                <div className="space-y-3">
                                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                                        If you have any questions or need further clarification regarding our return, cancellation, and refund policy, please feel free to contact us:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-[#65554D]">
                                        <li>
                                            Email:{" "}
                                            <a
                                                href="mailto:info.3dvishwa@gmail.com"
                                                className="text-[#3F5B43] hover:underline font-medium"
                                            >
                                                info.3dvishwa@gmail.com
                                            </a>
                                        </li>
                                        <li>Phone: +91 7276209570</li>
                                        <li>Address: Kashid Nagar, Pimple Gurav, Pune, Maharashtra 411061, India</li>
                                    </ul>
                                </div>
                            ),
                        },
                    ].map((section, i) => (
                        <motion.section
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInUp}
                            className="space-y-2 border-b border-[#ECE2D3] pb-8 last:border-b-0 last:pb-0"
                        >
                            <h2 className="text-xl font-bold text-[#3E312C]">{section.title}</h2>
                            <div>{section.content}</div>
                        </motion.section>
                    ))}
                </div>
            </main>
        </>
    );
}