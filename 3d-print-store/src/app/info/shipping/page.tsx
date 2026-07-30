"use client";
import { motion, Variants } from "framer-motion";
import Head from "next/head";
import { Sparkles } from "lucide-react";

export default function Shipping() {
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
        "@type": "DeliveryChargeSpecification",
        name: "Shipping and Delivery Policy - 3D Vishwa",
        description:
            "Free shipping on all products. Learn about order processing time, delivery timelines, address confirmation, and how to resolve delivery issues.",
        url: "https://3dvishwa.com/info/shipping",
        provider: {
            "@type": "Organization",
            name: "3D Vishwa",
            url: "https://3dvishwa.com",
            telephone: "+91 7276209570",
            email: "info.3dvishwa@gmail.com",
        },
        areaServed: {
            "@type": "Country",
            name: "India",
        },
        deliveryTime: "4-7 business days",
        hasDeliveryMethod: {
            "@type": "DeliveryMethod",
            name: "Standard Domestic Shipping",
        },
    };

    const sections = [
        {
            title: "Free Shipping on All Products",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    <strong className="text-[#3E312C] font-semibold">FREE SHIPPING ON ALL PRODUCTS</strong>
                    <br />
                    We are pleased to offer free shipping on all products. No minimum
                    order value is required for free shipping.
                </p>
            ),
        },
        {
            title: "Order Processing Time",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    Your order will be processed within 2 working days from the date of
                    purchase. Please note that weekends and public holidays are not
                    considered working days.
                </p>
            ),
        },
        {
            title: "Delivery Timeline",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    The estimated delivery time for orders is 4–7 working days from the
                    order date. However, please note that delivery timelines may vary
                    depending on your location and external factors like weather or
                    government guidelines.
                </p>
            ),
        },
        {
            title: "Delivery Delays",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    Delivery timelines can change due to circumstances beyond our control,
                    such as lockdowns or other restrictions imposed by government
                    authorities. We strive to deliver your products as quickly as possible
                    and will notify you of any significant delays.
                </p>
            ),
        },
        {
            title: "Our Commitment",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    We value your order and are doing our very best every single day to
                    ensure all orders are shipped and delivered on time. If you have any
                    concerns about the shipping process, feel free to contact us.
                </p>
            ),
        },
        {
            title: "Shipping Address Confirmation",
            content: (
                <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        To ensure smooth delivery, please double-check that your shipping
                        address, pincode, and mobile number are correct during checkout. If
                        you identify any errors, please notify us within 12 hours of placing
                        your order.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        Should your order be returned due to incorrect address details, we
                        can resend it after verifying the correct address. Please note that
                        additional charges may apply based on the order value and shipping
                        method.
                    </p>
                </div>
            ),
        },
        {
            title: "Package Delivery Issues",
            content: (
                <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        If you have not received your package but the tracking shows it as
                        delivered, please contact us within 24 hours of the tracking status
                        indicating delivery. You can reach us via email at{" "}
                        <a
                            href="mailto:info.3dvishwa@gmail.com"
                            className="text-[#3F5B43] hover:underline font-medium"
                        >
                            info.3dvishwa@gmail.com
                        </a>{" "}
                        or on WhatsApp at{" "}
                        <a
                            href="https://wa.me/917276209570"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3F5B43] hover:underline font-medium"
                        >
                            +91 7276209570
                        </a>
                        .
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                        We take every effort to ensure that your order arrives on time and
                        in good condition. If you encounter any issues with delivery, please
                        let us know immediately and we will work with the shipping partner
                        to resolve the problem.
                    </p>
                </div>
            ),
        },
        {
            title: "Contact Us",
            content: (
                <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                    If you have any further questions regarding shipping, delivery, or
                    address confirmation, feel free to contact our customer support team
                    at{" "}
                    <a
                        href="mailto:info.3dvishwa@gmail.com"
                        className="text-[#3F5B43] hover:underline font-medium"
                    >
                        info.3dvishwa@gmail.com
                    </a>{" "}
                    or via WhatsApp at{" "}
                    <a
                        href="https://wa.me/917276209570"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3F5B43] hover:underline font-medium"
                    >
                        +91 7276209570
                    </a>
                    .
                </p>
            ),
        },
    ];

    return (
        <>
            <Head>
                <title>Shipping and Delivery Policy | 3D Vishwa</title>
                <meta
                    name="description"
                    content="Free shipping on all products. Learn about our shipping and delivery process, timelines, address confirmation, and contact support."
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
                        <Sparkles className="w-3.5 h-3.5 text-[#3F5B43]" /> Logistics Policy
                    </span>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight"
                    >
                        Shipping and <span className="text-[#3F5B43]">Delivery</span>
                    </motion.h1>
                    <p className="text-xs text-[#65554D]">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                <div className="glass-card rounded-[24px] p-6 sm:p-12 space-y-8">
                    {sections.map((section, i) => (
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