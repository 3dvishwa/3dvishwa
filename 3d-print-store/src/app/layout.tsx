import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappChatbot from "@/components/WhatsappChatbot";
import { AuthProvider } from "@/lib/AuthContext";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext"; // 1. Import WishlistProvider
import { Toaster } from 'react-hot-toast';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "3D Vishwa (3DVishwa) | Custom 3D Prints & Personalized Gifts",
  description: "Custom 3D printed gifts, lithophanes, figures & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="overflow-x-hidden">
      <body
        className="
          min-h-screen
          w-full
          max-w-full
          overflow-x-hidden
          flex
          flex-col
          bg-[#FFF8F0]
          text-[#3E312C]
          antialiased
          font-['Inter',sans-serif]
          selection:bg-[#7B8F63]
          selection:text-white
        "
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#FFFDF9",
              color: "#3E312C",
              border: "1px solid #E7DCC8",
              borderRadius: "16px",
            },
            success: {
              iconTheme: {
                primary: "#3F5B43",
                secondary: "#FFFDF9",
              },
            },
          }}
        />

        <AuthProvider>
          <CartProvider>
            <WishlistProvider> {/* 2. Wrap WishlistProvider here */}

              {/* Navbar */}
              <Navbar />

              {/* Main Content */}
              <main className="relative flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 overflow-x-hidden">
                {/* Ambient organic glow */}
                <div className="glow-orb left-[-180px] top-20" />
                <div className="glow-orb right-[-200px] bottom-0" />

                {children}
              </main>

              <Footer />
              <WhatsappChatbot />

            </WishlistProvider> {/* Close WishlistProvider */}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}