"use client";

import { motion, Variants } from "framer-motion";
import Head from "next/head";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function Privacy() {
    const [isHovered, setIsHovered] = useState(false);

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
        "@type": "PrivacyPolicy",
        name: "Privacy Policy - 3D Vishwa",
        url: "https://3dvishwa.com/info/privacy",
        description:
            "3D Vishwa’s Privacy Policy explains how personal information is collected, used, and shared when you visit or make a purchase from www.3dvishwa.com",
        publisher: {
            "@type": "Organization",
            name: "3D Vishwa",
            url: "https://3dvishwa.com",
            telephone: "+91 7276209570",
            email: "info.3dvishwa@gmail.com",
        },
    };

    const sections = [
        {
            title: "",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    This Privacy Policy explains how your personal information is collected, used, and shared when you visit or make a purchase from{" "}
                    <a
                        href="https://3dvishwa.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3F5B43] hover:underline font-medium"
                    >
                        www.3dvishwa.com
                    </a>{" "}
                    (the &quot;Site&quot;).
                </p>
            ),
        },
        {
            title: "Personal Information We Collect",
            content: (
                <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, UPI, or other payment methods), email address, and phone number. This information is referred to as “Order Information.”
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        When we mention “Personal Information” in this Privacy Policy, we are referring to the Order Information that we collect.
                    </p>
                </div>
            ),
        },
        {
            title: "How Do We Use Your Personal Information?",
            content: (
                <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        We use the Order Information that we collect to fulfill any orders placed through the Site, which includes processing payment information, arranging shipping, and providing you with invoices or order confirmations. Additionally, we use this Order Information to:
                    </p>
                    <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-[#65554D]">
                        <li>Communicate with you;</li>
                        <li>Screen orders for potential risk or fraud;</li>
                        <li>Provide you with information or advertising related to our products or services, in line with the preferences you have shared with us;</li>
                        <li>Target potential customers similar to our current customers.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Customer-Provided Images",
            content: (
                <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        As part of the services we provide, customers may upload images for the purpose of creating lithophanes or printing 3D objects. By submitting such images, the customer grants us explicit consent to use, process, and print the images as per the requested services.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        We ensure that the provided images are used solely for the purpose of fulfilling the order and do not share them with any third parties, except as necessary to process the order (such as with a 3D printing partner or logistics provider).
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        Customers retain the rights to their images, and we do not claim ownership over the images submitted. However, by submitting the images, you affirm that you have the right to use and provide the images for the intended purpose and that they do not infringe upon any copyright or intellectual property rights of others.
                    </p>
                </div>
            ),
        },
        {
            title: "Sharing Your Personal Information",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    We may share your Personal Information with third parties to comply with applicable laws and regulations, respond to a subpoena, search warrant, or other lawful request for information we receive, or to protect our rights.
                </p>
            ),
        },
        {
            title: "Behavioral Advertising",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications that we believe may be of interest to you.
                </p>
            ),
        },
        {
            title: "Do Not Track",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    Please note that we do not alter our Site’s data collection and use practices when we see a &quot;Do Not Track&quot; signal from your browser.
                </p>
            ),
        },
        {
            title: "Your Rights",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    If you are an Indian resident, you have the right to access, correct, update, or delete your personal information. If you wish to exercise this right, please contact us using the information provided below.
                </p>
            ),
        },
        {
            title: "Data Retention",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    We retain your Order Information for our records unless and until you ask us to delete this information. If you would like us to delete your information, please contact us as outlined below.
                </p>
            ),
        },
        {
            title: "Changes to This Privacy Policy",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    We may update this Privacy Policy from time to time to reflect changes to our practices, or for operational, legal, or regulatory reasons.
                </p>
            ),
        },
        {
            title: "Minors",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    The Site is not intended for individuals under the age of 18. We do not knowingly collect or solicit information from children under 18.
                </p>
            ),
        },
        {
            title: "Contact Us",
            content: (
                <div className="space-y-3">
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        If you have any questions or concerns about this Privacy Policy or your personal information, please contact us at:
                    </p>
                    <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-[#65554D]">
                        <li>
                            <strong className="text-[#3E312C]">Email:</strong>{" "}
                            <a href="mailto:info.3dvishwa@gmail.com" className="text-[#3F5B43] hover:underline font-medium">
                                info.3dvishwa@gmail.com
                            </a>
                        </li>
                        <li><strong className="text-[#3E312C]">Phone:</strong> +91 7276209570</li>
                        <li><strong className="text-[#3E312C]">Address:</strong> Kashid Nagar, Pimple Gurav, Pune, Maharashtra 411061, India</li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head>
                <title>Privacy Policy | 3D Vishwa</title>
                <meta
                    name="description"
                    content="This Privacy Policy explains how your personal information is collected, used, and shared when you visit or make a purchase from 3D Vishwa."
                />
                <meta name="robots" content="index, follow" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            </Head>

            <main className="max-w-4xl mx-auto py-8 space-y-10 text-[#3E312C] font-sans">
                <div className="text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#3F5B43]" /> Data Privacy
                    </span>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight"
                    >
                        Privacy <span className="text-[#3F5B43]">Policy</span>
                    </motion.h1>
                    <p className="text-xs text-[#65554D]">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                <div className="glass-card rounded-[24px] p-6 sm:p-12 space-y-8">
                    {sections.map((sec, i) => (
                        <motion.section
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInUp}
                            className="space-y-2 border-b border-[#ECE2D3] pb-8 last:border-b-0 last:pb-0"
                        >
                            {sec.title && <h2 className="text-xl font-bold text-[#3E312C]">{sec.title}</h2>}
                            <div>{sec.content}</div>
                        </motion.section>
                    ))}
                </div>
            </main>
        </>
    );
}