import type { Metadata } from "next";


import "./globals.css";

import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { organizationSchema } from "./schema";
import WhatsAppButton from "@/components/ui/WhatsAppButton";



export const metadata: Metadata = {

  title: {
    default:
      "3DVishva Software Solutions | Web Development, Mobile Apps & Cloud Solutions",

    template:
      "%s | 3DVishva Software Solutions",
  },


  description:
    "3DVishva Software Solutions builds modern websites, mobile applications, cloud platforms, and custom software solutions for businesses.",



  keywords: [
    "software development company",
    "website development",
    "mobile app development",
    "cloud deployment",
    "Next.js development",
    "React development",
    "Golang development",
    "AWS solutions",
    "custom software development",
  ],



  authors: [
    {
      name:
        "3DVishva Software Solutions",
    },
  ],



  creator:
    "3DVishva Software Solutions",



  metadataBase:
    new URL(
      "https://www.3dvishwa.com"
    ),



  openGraph: {

    title:
      "3DVishva Software Solutions",

    description:
      "Building scalable websites, mobile apps, and cloud solutions.",

    url:
      "https://www.3dvishwa.com",

    siteName:
      "3DVishva Software Solutions",

    locale:
      "en_IN",

    type:
      "website",

    images: [
      {
        url:
          "/og-image.png",

        width:
          1200,

        height:
          630,

        alt:
          "3DVishva Software Solutions",
      },
    ],

  },



  twitter: {

    card:
      "summary_large_image",

    title:
      "3DVishva Software Solutions",

    description:
      "Modern web, mobile and cloud solutions.",

    images: [
      "/og-image.png",
    ],

  },



  robots: {

    index:
      true,

    follow:
      true,

  },


};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en">


      <body className="antialiased">


        <Navbar />



        <main className="pt-24">

          {children}

        </main>



        <Footer />



        {/* Floating WhatsApp Chat */}

        <WhatsAppButton />



        {/* Organization SEO Schema */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                organizationSchema
              ),
          }}
        />


      </body>


    </html>

  );

}