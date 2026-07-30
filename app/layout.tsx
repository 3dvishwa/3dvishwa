import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "3D Vishwa | Scandinavian Tech Ecosystem",
    description: "Explore 3D Printing Studio and TechWorks Software Engineering Studio.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-[#2E3135] text-[#FFFFFF] font-sans antialiased selection:bg-[#5B8DEF] selection:text-[#2E3135]">
                {children}
            </body>
        </html>
    );
}