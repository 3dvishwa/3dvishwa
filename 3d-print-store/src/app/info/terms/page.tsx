"use client";

import Head from "next/head";
import { motion, Variants } from "framer-motion";

// Animation Variants with explicit type
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.6, ease: "easeOut" },
    }),
};

// SEO Schema with dynamic dateModified
const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions - 3D Vishwa",
    description:
        "Read 3D Vishwa's Terms and Conditions to understand our service terms, obligations, and limitations.",
    url: "https://3dvishwa.com/info/terms",
    publisher: {
        "@type": "Organization",
        name: "3D Vishwa",
        url: "https://3dvishwa.com",
        logo: {
            "@type": "ImageObject",
            url: "https://3dvishwa.com/logo.png",
        },
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
};

export default function Terms() {
    const termsSections = [
        <>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 1 – Online Store Terms</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 2 – General Conditions</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We reserve the right to refuse service to anyone for any reason at any time.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 3 – Accuracy, Completeness, and Timeliness of Information</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                This site may contain certain historical information. Historical information is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 4 – Modifications to the Service and Prices</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 5 – Products or Services</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 6 – Accuracy of Billing and Account Information</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 7 – Optional Tools</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 8 – Third-Party Links</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Certain content, products, and services available via our Service may include materials from third parties.
                Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not
                responsible for examining or evaluating the content or accuracy, and we do not warrant, and will not have any liability
                or responsibility for any third-party materials or websites, or for any other materials, products, or services of third parties.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content,
                or any other transactions made in connection with any third-party websites. Please review the third-party’s policies
                and practices and make sure you understand them before engaging in any transaction. Complaints, claims, concerns,
                or questions regarding third-party products should be directed to the third-party.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 9 – User Comments, Feedback, and Other Submissions</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                If, at our request, you send certain specific submissions (such as contest entries) or, without a request from us,
                you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail,
                or otherwise (collectively, “comments”), you agree that we may, at any time, without restriction, edit, copy, publish,
                distribute, translate and otherwise use in any medium any comments that you forward to us. We are not obligated to
                maintain any comments in confidence, to pay compensation for any comments, or to respond to any comments.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We may, but are not obligated to, monitor, edit, or remove content that we determine, in our sole discretion, to be
                unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene, or otherwise objectionable, or that
                violates any party’s intellectual property or these Terms of Service.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                You agree that your comments will not violate any right of any third party, including copyright, trademark, privacy,
                personality, or other personal or proprietary right. You further agree that your comments will not contain libelous,
                unlawful, abusive, or obscene material, or any computer virus or other malware that could affect the operation of
                the Service or any related website. You may not use a false email address, pretend to be someone else, or otherwise
                mislead us or third parties as to the origin of any comments. You are solely responsible for the comments you make and
                their accuracy.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 10 – Personal Information</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy,
                please click <a href="/info/privacy" className="text-[#3F5B43] hover:underline font-medium">here</a>.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 11 – Errors, Inaccuracies, and Omissions</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Occasionally, there may be information on our site or in the Service that contains typographical errors, inaccuracies,
                or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit
                times, and availability. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or
                update information or cancel orders if any information in the Service or on any related website is inaccurate at any
                time without prior notice (including after you have submitted your order).
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We undertake no obligation to update, amend, or clarify information in the Service or on any related website, including
                without limitation, pricing information, except as required by law. No specified update or refresh date applied in the
                Service or on any related website should be taken to indicate that all information in the Service or on any related
                website has been modified or updated.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 12 – Prohibited Uses</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its
                content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to
                violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to
                infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass,
                abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion,
                ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or
                transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality
                or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the
                personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral
                purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites,
                or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the
                prohibited uses.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 13 – Disclaimer of Warranties; Limitation of Liability</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free.
                We do not warrant that the results obtained from the use of the service will be accurate or reliable. You agree that from time
                to time, we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.
                The service and all products and services delivered to you through the service are provided "as is" and "as available" for your
                use, without any representation, warranties, or conditions of any kind.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                In no event shall we, or our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service
                providers, or licensors be liable for any direct or indirect damages, including lost profits, data loss, or any other
                consequential damages.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 14 – Indemnification</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                You agree to indemnify, defend, and hold harmless 3D Vishwa, its subsidiaries, affiliates, partners, officers, directors,
                agents, contractors, licensors, service providers, and employees from any claim or demand, including reasonable attorney's
                fees, made by any third-party due to or arising from your breach of these Terms of Service, or your violation of any law or
                the rights of a third-party.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 15 – Severability</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                In the event any provision of these Terms of Service is determined to be unlawful, void, or unenforceable, such provision
                shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall
                be deemed severed from these Terms of Service, such determination shall not affect the validity and enforceability of any
                other remaining provisions.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 16 – Termination</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of
                this agreement for all purposes. These Terms of Service are effective unless and until terminated by either you or us.
                You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our services, or when
                you cease using our site.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms
                of Service, we may terminate this agreement at any time without notice and you will remain liable for all amounts due
                up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 17 – Entire Agreement</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us. Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 18 – Governing Law</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed
                in accordance with the laws of India.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 19 – Changes to Terms of Service</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our
                sole discretion, to update, change, or replace any part of these Terms of Service by posting updates and changes to our
                website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our
                website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
            </p>
        </>,
        <>
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#3E312C]">Section 20 – Contact Information</h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify text-[#65554D]">
                Questions about the Terms of Service should be sent to us at: <a href="mailto:info.3dvishwa@gmail.com" className="text-[#3F5B43] hover:underline font-medium">info.3dvishwa@gmail.com</a>.
            </p>
        </>,
    ];

    return (
        <>
            <Head>
                <title>Terms and Conditions | 3D Vishwa</title>
                <meta
                    name="description"
                    content="Review 3D Vishwa’s Terms and Conditions covering our policies on orders, refunds, intellectual property, and legal compliance."
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(termsSchema),
                    }}
                />
            </Head>

            <main className="max-w-4xl mx-auto py-8 text-[#3E312C] font-sans">
                <motion.div
                    className="glass-card p-8 sm:p-12 rounded-[24px] space-y-8"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <motion.div className="text-center space-y-2 border-b border-[#ECE2D3] pb-8" variants={fadeInUp}>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider shadow-sm">
                            Legal Policy
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">
                            Terms and Conditions
                        </h1>
                        <p className="text-xs text-[#65554D]">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </motion.div>

                    {termsSections.map((section, index) => (
                        <motion.section
                            key={index}
                            className="space-y-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            custom={index}
                            variants={fadeInUp}
                        >
                            {section}
                        </motion.section>
                    ))}
                </motion.div>
            </main>
        </>
    );
}