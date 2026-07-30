"use client";

import Link from "next/link";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast, Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Send, Sparkles, User, MessageSquare, CheckCircle2 } from "lucide-react";

export default function EnquiryPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const presetTopics = [
        "Custom Lithophane Frame",
        "Personalized Keychain",
        "Resin Divine Idol",
        "3D Scanning & CAD Design",
        "Bulk Order Quote"
    ];

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Pre-fill message topic
    const handlePresetClick = (topic: string) => {
        setFormData((prev) => ({
            ...prev,
            message: prev.message ? `${prev.message}\nTopic: ${topic}` : `Inquiry about: ${topic}`,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Submitting your enquiry...");

        try {
            await addDoc(collection(db, "enquiries"), {
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                message: formData.message.trim(),
                createdAt: new Date().toISOString(),
            });

            toast.success("Enquiry submitted successfully! We will get back to you soon.", { id: toastId });
            setFormData({ name: "", phone: "", message: "" });
        } catch (error) {
            console.error("Error submitting enquiry: ", error);
            toast.error("Failed to submit enquiry. Please try again later.", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#3E312C] font-sans">
            <Toaster position="top-right" />

            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#3F5B43]" /> Get in Touch
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3E312C] tracking-tight">
                    Contact Our 3D Printing Studio
                </h1>
                <p className="text-[#65554D] text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
                    Have questions about custom lithophanes, personalized keychains, resin idols, or bulk industrial prints? Send us a message below and we will craft a solution for you.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

                {/* Left Side: Interactive Contact Info & Location */}
                <motion.div
                    className="flex-1 flex flex-col justify-between space-y-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    {/* Embedded Google Map Card */}
                    <div className="glass-card rounded-[24px] overflow-hidden border border-[#ECE2D3] shadow-sm h-64 lg:h-80 relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15126.672511165472!2d73.81319204999998!3d18.588994949999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b8c684c414d3%3A0x4756a62035babeb2!2sPimple%20Gurav%2C%20Pimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1754326605514!5m2!1sen!2sin"
                            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="3D Vishwa Studio Location Map"
                        />
                    </div>

                    {/* Studio Contact Card */}
                    <div className="glass-card p-6 sm:p-8 rounded-[24px] border border-[#ECE2D3] space-y-5 shadow-sm bg-[#FFFDF9]/80 backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-[#ECE2D3] pb-4">
                            <div>
                                <h3 className="font-extrabold text-[#3E312C] text-lg sm:text-xl">Studio Address</h3>
                                <p className="text-xs font-semibold text-[#7B8F63] uppercase tracking-wider mt-0.5">3D Vishwa Creations</p>
                            </div>
                            <span className="p-3 rounded-[16px] bg-[#FCF8F3] border border-[#ECE2D3] text-[#3F5B43]">
                                <MapPin className="w-5 h-5" />
                            </span>
                        </div>

                        <div className="space-y-4 text-sm text-[#65554D]">
                            <div className="flex items-start gap-3">
                                <User className="w-4 h-4 text-[#3F5B43] flex-shrink-0 mt-1" />
                                <div>
                                    <span className="block text-xs font-semibold text-[#65554D] uppercase">Contact Person</span>
                                    <span className="font-bold text-[#3E312C]">Mr. Deepak Gaikwad</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-[#3F5B43] flex-shrink-0 mt-1" />
                                <div>
                                    <span className="block text-xs font-semibold text-[#65554D] uppercase">Phone / Mobile</span>
                                    <a href="tel:+917276209570" className="font-bold text-[#3E312C] hover:text-[#3F5B43] transition-colors">
                                        +91 7276209570
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#3F5B43] flex-shrink-0 mt-1" />
                                <div>
                                    <span className="block text-xs font-semibold text-[#65554D] uppercase">Location</span>
                                    <p className="leading-relaxed text-[#3E312C] font-medium">
                                        Kashid Nagar, Pimple Gurav, Pune,<br />
                                        Maharashtra - 411061, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Enhanced Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="flex-1 glass-card rounded-[24px] border border-[#ECE2D3] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-sm bg-[#FFFDF9]"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#3E312C]">Send Us an Enquiry</h2>
                            <p className="text-xs sm:text-sm text-[#65554D] mt-1">Fill out the details below and we will respond within 24 hours.</p>
                        </div>

                        {/* Quick Topic Selector */}
                        <div>
                            <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                                Popular Topics (Click to add to message)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {presetTopics.map((topic) => (
                                    <button
                                        type="button"
                                        key={topic}
                                        onClick={() => handlePresetClick(topic)}
                                        className="px-3 py-1.5 rounded-[12px] bg-[#FCF8F3] border border-[#ECE2D3] text-xs font-semibold text-[#3E312C] hover:border-[#7B8F63] hover:bg-[#3F5B43] hover:text-white transition-all cursor-pointer"
                                    >
                                        + {topic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Full Name Input */}
                        <div>
                            <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                                Your Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Rahul Sharma"
                                    className="w-full pl-11 pr-4 py-3.5 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g. +91 98765 43210"
                                    className="w-full pl-11 pr-4 py-3.5 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Message Textarea */}
                        <div>
                            <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                                Your Message / Requirement <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe your custom print specifications, required dimensions, material preference, or general query..."
                                    className="w-full pl-11 pr-4 py-3.5 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-4 text-sm font-semibold shadow-md disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95 cursor-pointer transition-all"
                        >
                            {loading ? "Submitting Enquiry..." : "Submit Enquiry"}
                            <Send className="w-4 h-4" />
                        </button>

                        {/* Direct Connect Options */}
                        <div className="pt-6 border-t border-[#ECE2D3] text-center space-y-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#65554D]">Or connect instantly via</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-3">
                                <Link
                                    href="mailto:info.3dvishwa@gmail.com"
                                    className="btn-secondary inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold cursor-pointer active:scale-95"
                                >
                                    <Mail className="w-4 h-4 text-[#3F5B43]" /> Email Us Directly
                                </Link>
                                <a
                                    href="https://wa.me/917276209570"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold shadow-sm cursor-pointer active:scale-95"
                                >
                                    <MessageCircle className="w-4 h-4" /> Instant WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}