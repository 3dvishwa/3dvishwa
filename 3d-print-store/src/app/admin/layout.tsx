import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

// Explicitly force dynamic rendering to prevent static build generation errors
// when accessing cookies/sessions inside server components.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 1. Server-Side Guard: Read httpOnly session cookie and verify via Firebase Admin + Firestore
    const { user } = await getSession();

    // 2. Reject non-admin / unauthenticated requests at the server level
    if (!user || user.userType !== "Admin") {
        redirect("/"); // Instant 307 Server-side redirect
    }

    const links = [
        { href: "/admin/add-product", label: "Add Product" },
        { href: "/admin/view-orders", label: "View Orders" },
        { href: "/admin/view-users", label: "View Users" },
        { href: "/admin/view-enquiries", label: "View Enquiries" },
        { href: "/admin/inventory", label: "Inventory Management" },
        { href: "/admin/productcostcalculator", label: "Product Cost Calculator" },
        { href: "/admin/printshippingsticker", label: "Print Shipping Sticker" },
    ];

    return (
        <div className="flex min-h-screen bg-[#FFFDF9] text-[#3E312C] font-sans">
            <Toaster position="top-right" />

            {/* Client Component Sidebar */}
            <AdminSidebar links={links} />

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 p-6 md:p-10 mt-14 md:mt-0 max-w-[1400px]">
                {children}
            </main>
        </div>
    );
}