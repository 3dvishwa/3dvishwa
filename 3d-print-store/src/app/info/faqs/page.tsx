"use client";

import Head from "next/head";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

export default function FAQs() {
    const faqs = [
        {
            question: "What is a lithophane?",
            answer:
                "A lithophane is a 3D printed or carved artwork that reveals an image when backlit.",
        },
        {
            question: "How long does the shipping take?",
            answer:
                "Shipping typically takes 4-7 business days within India, but may vary depending on location and external factors like weather or government guidelines. For international shipping, it can take 10-15 business days.",
        },
        {
            question: "Can I customize the shape and size?",
            answer:
                "Yes, you can select from various shapes and sizes for your custom lithophane.",
        },
        {
            question: "What image formats are accepted for upload?",
            answer:
                "We accept PNG and JPEG formats for uploading images.",
        },
        {
            question: "What is your return and cancellation policy?",
            answer:
                "We have a 10-day return policy. You can request a return within 10 days of receiving the product, provided the item is unused and in its original packaging. For full details, please refer to our 'Cancellation and Refund Policy'.",
        },
        {
            question: "Can I cancel my order after placing it?",
            answer:
                "You can cancel your order before it is shipped. Once the order is shipped, the return policy will apply instead of cancellation. Please contact us immediately at info.3dvishwa@gmail.com if you wish to cancel.",
        },
        {
            question: "How do I return an item?",
            answer:
                "To return an item, contact us at info.3dvishwa@gmail.com within 10 days of receiving the product. Once the return is approved, we will send you a return shipping label and instructions on how to send the product back.",
        },
        {
            question: "Do you offer free shipping?",
            answer:
                "Yes, we offer free shipping on all products. No minimum order value is required for free shipping.",
        },
        {
            question: "How long will it take to process my return or refund?",
            answer:
                "Once we receive your return, it will be inspected, and you'll be notified within 2 business days about the status of your refund. If approved, your refund will be processed within 10 business days.",
        },
        {
            question: "What if I receive a defective or damaged item?",
            answer:
                "If your order is defective, damaged, or if you received the wrong item, please contact us immediately at info.3dvishwa@gmail.com so that we can resolve the issue as soon as possible.",
        },
        {
            question: "Can I return customized or personalized items?",
            answer:
                "Customized or personalized items (such as lithophanes) are non-returnable unless they are defective or damaged upon receipt. Please ensure the item is as per your specifications before placing the order.",
        },
        {
            question: "What should I do if my package is delayed or not delivered?",
            answer:
                "If your package is delayed, please reach out to us. We strive to deliver orders within 4-7 business days, but external factors like weather or lockdowns may cause delays. If tracking shows delivery but you haven’t received it, contact us within 24 hours at info.3dvishwa@gmail.com or on WhatsApp at +91 7276209570.",
        },
        {
            question: "What should I do if I entered the wrong shipping address?",
            answer:
                "To avoid issues with delivery, please double-check your address details when placing the order. If you notice any mistakes, please notify us within 12 hours of placing the order. If the package is returned due to an incorrect address, we can resend it after verifying the correct details, but additional charges may apply.",
        },
        {
            question: "Do you ship internationally?",
            answer:
                "Yes, we offer international shipping. Please note that international customers are responsible for the return shipping costs and any customs duties or taxes associated with their order.",
        },
        {
            question: "How do I track my order?",
            answer:
                "Once your order has been shipped, you will receive a tracking number via email or SMS. You can use that tracking number to track your package's delivery status.",
        },
        {
            question: "Can I change my shipping address after placing an order?",
            answer:
                "If you realize that you’ve entered an incorrect address after placing your order, please contact us within 12 hours. After that, we cannot guarantee that the address can be changed before shipping.",
        },
        {
            question: "Can I request a refund if my order is delayed?",
            answer:
                "We will strive to ship and deliver your order on time. However, if the delay is due to factors outside of our control (e.g., weather, government restrictions), we cannot offer refunds for delayed orders. If there’s a significant delay, we will notify you.",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
        }),
    };

    return (
        <>
            <Head>
                <title>Frequently Asked Questions | 3D Vishwa</title>
                <meta
                    name="description"
                    content="Find answers to common questions about lithophanes, shipping, returns, and customization at 3D Vishwa."
                />
                <meta name="robots" content="index, follow" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faqs.map((faq) => ({
                                "@type": "Question",
                                name: faq.question,
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: faq.answer,
                                },
                            })),
                        }),
                    }}
                />
            </Head>

            <main className="max-w-4xl mx-auto py-8 space-y-10 text-[#3E312C] font-sans">
                <div className="text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#3F5B43]" /> Help & Support
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">
                        Frequently Asked <span className="text-[#3F5B43]">Questions</span>
                    </h1>
                    <p className="text-sm sm:text-base text-[#65554D] max-w-xl mx-auto leading-relaxed">
                        Got questions about your 3D printed creations, shipping, or returns? Find answers below.
                    </p>
                </div>

                <div className="glass-card rounded-[24px] p-6 sm:p-10 space-y-4">
                    {faqs.map(({ question, answer }, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="border-b border-[#ECE2D3] pb-4 last:border-b-0 last:pb-0"
                        >
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="w-full flex justify-between items-center text-left py-3 group focus:outline-none cursor-pointer"
                                aria-expanded={openIndex === i}
                            >
                                <h2 className="text-base sm:text-lg font-bold text-[#3E312C] group-hover:text-[#3F5B43] transition-colors pr-4">
                                    {question}
                                </h2>
                                <span className={`p-2 rounded-xl bg-[#FFFDF9] border border-[#ECE2D3] text-[#65554D] group-hover:border-[#7B8F63] group-hover:text-[#3F5B43] transition-all duration-300 shrink-0 ${openIndex === i ? "rotate-180 bg-[#7B8F63]/10 border-[#7B8F63]/30 text-[#3F5B43]" : ""}`}>
                                    <ChevronDown className="w-4 h-4" />
                                </span>
                            </button>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={
                                    openIndex === i
                                        ? { height: "auto", opacity: 1 }
                                        : { height: 0, opacity: 0 }
                                }
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="text-xs sm:text-sm text-[#65554D] pb-3 leading-relaxed">{answer}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </>
    );
}