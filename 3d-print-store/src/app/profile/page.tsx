'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { User, Mail, Phone, MapPin, Plus, Trash2, ArrowLeft, LogOut, Edit3, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [newAddress, setNewAddress] = useState({
        name: "", mobile: "", line1: "", line2: "", landmark: "", city: "", pincode: "", state: "", tag: "Home"
    });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const USERDATA_KEY = "userData";
    const ADDRS_KEY = "addresses";
    const USERDATA_TS_KEY = "userData_ts";

    // 1. Load cached profile immediately
    useEffect(() => {
        try {
            const cachedUser = sessionStorage.getItem(USERDATA_KEY);
            const cachedAddrs = sessionStorage.getItem(ADDRS_KEY);

            if (cachedUser) setUserData(JSON.parse(cachedUser));
            if (cachedAddrs) setAddresses(JSON.parse(cachedAddrs));
        } catch (err) {
            console.warn("Failed to read cached profile:", err);
        }
    }, []);

    // 2. Listen to Firebase Auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace("/login");
                return;
            }

            setCurrentUser(user);

            try {
                setProgress(20);
                const snap = await getDoc(doc(db, "users", user.uid));

                setProgress(70);
                if (snap.exists()) {
                    const data: any = snap.data();
                    const addrList = data.addresses || [];

                    if (!data.mobile && addrList.length > 0) {
                        data.mobile = addrList[0].mobile || "";
                    }

                    setUserData(data);
                    setAddresses(addrList);

                    sessionStorage.setItem(USERDATA_KEY, JSON.stringify(data));
                    sessionStorage.setItem(ADDRS_KEY, JSON.stringify(addrList));
                    sessionStorage.setItem(USERDATA_TS_KEY, Date.now().toString());
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                toast.error("Failed to refresh profile");
            } finally {
                setProgress(100);
                setTimeout(() => setProgress(0), 500);
            }
        });

        return () => unsubscribe();
    }, [router]);

    // Handle Address Add or Edit Update
    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const uid = currentUser?.uid;
        if (!uid) return toast.error("User not logged in");
        setLoading(true);
        const toastId = toast.loading(editingIndex !== null ? "Updating address..." : "Saving address...");

        try {
            const docRef = doc(db, "users", uid);

            const addressToSave = {
                name: newAddress.name || userData?.name || "",
                mobile: newAddress.mobile || userData?.mobile || "",
                line1: newAddress.line1.trim(),
                line2: newAddress.line2.trim(),
                landmark: newAddress.landmark.trim(),
                city: newAddress.city.trim(),
                pincode: newAddress.pincode.trim(),
                state: newAddress.state.trim(),
                tag: newAddress.tag || "Home",
                email: userData?.email || "",
                createdAt: new Date().toISOString(),
            };

            let updatedAddresses = [...addresses];

            if (editingIndex !== null) {
                // Update existing
                updatedAddresses[editingIndex] = addressToSave;
                await updateDoc(docRef, { addresses: updatedAddresses });
            } else {
                // Add new
                await updateDoc(docRef, { addresses: arrayUnion(addressToSave) });
                updatedAddresses.push(addressToSave);
            }

            if (!userData?.mobile && newAddress.mobile) {
                await updateDoc(docRef, { mobile: newAddress.mobile });
                setUserData((prev: any) => ({ ...prev, mobile: newAddress.mobile }));
                sessionStorage.setItem(USERDATA_KEY, JSON.stringify({ ...userData, mobile: newAddress.mobile }));
            }

            setAddresses(updatedAddresses);
            sessionStorage.setItem(ADDRS_KEY, JSON.stringify(updatedAddresses));

            // Reset form
            setNewAddress({
                name: "", mobile: "", line1: "", line2: "", landmark: "", city: "", pincode: "", state: "", tag: "Home"
            });
            setEditingIndex(null);

            toast.success(editingIndex !== null ? "Address updated successfully" : "Address added successfully", { id: toastId });
        } catch (err: any) {
            console.error("Error saving address:", err);
            toast.error(err?.message || "Failed to save address", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    // Populate form for editing
    const handleEditAddress = (addr: any, index: number) => {
        setNewAddress({
            name: addr.name || "",
            mobile: addr.mobile || "",
            line1: addr.line1 || "",
            line2: addr.line2 || "",
            landmark: addr.landmark || "",
            city: addr.city || "",
            pincode: addr.pincode || "",
            state: addr.state || "",
            tag: addr.tag || "Home"
        });
        setEditingIndex(index);
        window.scrollTo({ top: 380, behavior: "smooth" });
    };

    // Delete address
    const handleDeleteAddress = async (addr: any) => {
        const uid = currentUser?.uid;
        if (!uid) return toast.error("User not logged in");
        const toastId = toast.loading("Removing address...");
        try {
            const docRef = doc(db, "users", uid);
            await updateDoc(docRef, { addresses: arrayRemove(addr) });

            const updatedAddresses = addresses.filter(a => !deepEqualAddress(a, addr));
            setAddresses(updatedAddresses);
            sessionStorage.setItem(ADDRS_KEY, JSON.stringify(updatedAddresses));

            if (editingIndex !== null) setEditingIndex(null);

            toast.success("Address deleted", { id: toastId });
        } catch (err: any) {
            console.error("Error deleting address:", err);
            toast.error(err?.message || "Failed to delete address", { id: toastId });
        }
    };

    function deepEqualAddress(a: any, b: any) {
        const keys = ["name", "mobile", "line1", "line2", "landmark", "city", "pincode", "state", "tag"];
        return keys.every(k => (a[k] || "") === (b[k] || ""));
    }

    return (
        <div className="max-w-[1280px] mx-auto py-8 sm:py-12 px-4 sm:px-6 text-[#3E312C] font-sans">
            <Toaster position="top-right" />

            {/* Progress Bar */}
            {progress > 0 && (
                <div className="w-full bg-[#ECE2D3] rounded-full h-1.5 mb-6 overflow-hidden">
                    <div
                        className="bg-[#3F5B43] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Top Bar Header */}
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap border-b border-[#ECE2D3] pb-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> Customer Account
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">
                        My Account Details
                    </h1>
                    <p className="text-xs sm:text-sm text-[#65554D] mt-1">
                        Manage your profile identity, saved delivery addresses, and contact preferences.
                    </p>
                </div>
                <div className="flex items-center gap-2.5">
                    <Link href="/" className="btn-secondary inline-flex items-center gap-2 text-xs font-semibold py-2.5 px-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Store
                    </Link>
                    <Link href="/logout" className="px-4 py-2.5 rounded-[14px] text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition inline-flex items-center gap-2 cursor-pointer">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Link>
                </div>
            </div>

            {/* Profile Hero Card */}
            {userData ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <UserInfo userData={userData} addresses={addresses} />
                </motion.div>
            ) : (
                <div className="p-8 rounded-[24px] glass-card mb-8 text-[#65554D] text-sm text-center border border-[#ECE2D3] animate-pulse">
                    Loading customer profile...
                </div>
            )}

            {/* Main Content Grid: Address List & Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Address List Section */}
                <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#3E312C] flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#3F5B43]" /> Saved Addresses
                        </h2>
                        <span className="text-xs font-bold text-[#65554D] bg-[#FCF8F3] border border-[#ECE2D3] px-3 py-1 rounded-full">
                            {addresses.length} {addresses.length === 1 ? "Address" : "Addresses"}
                        </span>
                    </div>

                    <AddressList
                        addresses={addresses}
                        onDelete={handleDeleteAddress}
                        onEdit={handleEditAddress}
                    />
                </div>

                {/* Add / Edit Address Form Section */}
                <div className="lg:col-span-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#3E312C] flex items-center gap-2">
                            {editingIndex !== null ? (
                                <>
                                    <Edit3 className="w-5 h-5 text-[#3F5B43]" /> Edit Saved Address
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5 text-[#3F5B43]" /> Add Delivery Address
                                </>
                            )}
                        </h2>
                        {editingIndex !== null && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingIndex(null);
                                    setNewAddress({
                                        name: "", mobile: "", line1: "", line2: "", landmark: "", city: "", pincode: "", state: "", tag: "Home"
                                    });
                                }}
                                className="text-xs font-bold text-[#B8724A] hover:underline cursor-pointer"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <AddressForm
                        newAddress={newAddress}
                        setNewAddress={setNewAddress}
                        onSubmit={handleAddressSubmit}
                        loading={loading}
                        isEditing={editingIndex !== null}
                    />
                </div>
            </div>
        </div>
    );
}

/* -------------------- Sub-Components -------------------- */

function UserInfo({ userData, addresses }: { userData: any, addresses: any[] }) {
    const mobileFallback = addresses?.[0]?.mobile || "—";

    return (
        <div className="mb-10 glass-card p-5 sm:p-7 rounded-[28px] border border-[#ECE2D3] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#FFFDF9]/90 overflow-hidden">
            <div className="flex items-center gap-4 min-w-0 max-w-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] bg-[#FCF8F3] border border-[#ECE2D3] flex items-center justify-center text-[#3F5B43] font-black text-xl sm:text-2xl shadow-xs shrink-0">
                    {userData.name ? userData.name.charAt(0).toUpperCase() : <User className="w-7 h-7" />}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#3E312C] truncate max-w-[220px] sm:max-w-xs">{userData.name || "Valued Customer"}</h2>
                        <span className="p-1 rounded-full bg-[#7B8F63]/10 text-[#3F5B43] shrink-0" title="Verified Customer">
                            <ShieldCheck className="w-4 h-4" />
                        </span>
                    </div>
                    {/* Handled long email text wrap/break safely */}
                    <p className="text-xs sm:text-sm text-[#65554D] flex items-center gap-2 mt-1 break-all sm:break-normal max-w-full">
                        <Mail className="w-4 h-4 text-[#3F5B43] shrink-0" />
                        <span className="truncate max-w-[240px] sm:max-w-sm">{userData.email || "—"}</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:text-right border-t sm:border-t-0 sm:border-l border-[#ECE2D3] pt-4 sm:pt-0 sm:pl-8 w-full sm:w-auto shrink-0">
                <span className="text-xs font-bold text-[#65554D] uppercase tracking-wider">Primary Contact</span>
                <span className="text-sm sm:text-base font-extrabold text-[#3E312C] flex items-center gap-2 mt-1 sm:justify-end">
                    <Phone className="w-4 h-4 text-[#3F5B43]" /> {userData.mobile || mobileFallback}
                </span>
            </div>
        </div>
    );
}

function AddressList({
    addresses,
    onDelete,
    onEdit
}: {
    addresses: any[],
    onDelete: (addr: any) => void,
    onEdit: (addr: any, index: number) => void
}) {
    return (
        <div className="space-y-4">
            <AnimatePresence>
                {addresses.length > 0 ? addresses.map((ad, idx) => (
                    <motion.div
                        key={idx}
                        className="p-5 glass-card rounded-[22px] border border-[#ECE2D3] transition-all bg-[#FFFDF9] shadow-xs flex flex-col justify-between gap-3"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                    >
                        {/* Address Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#ECE2D3]">
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                                <span className="font-extrabold text-[#3E312C] text-sm truncate">{ad.name || "—"}</span>
                                <span className="text-xs text-[#65554D]">•</span>
                                <span className="text-xs font-semibold text-[#65554D] shrink-0">{ad.mobile || "—"}</span>
                            </div>
                            <span className="px-3 py-1 text-[10px] font-extrabold bg-[#7B8F63]/10 text-[#3F5B43] rounded-full border border-[#7B8F63]/20 uppercase tracking-wider shrink-0">
                                {ad.tag || "Home"}
                            </span>
                        </div>

                        {/* Address Body */}
                        <div className="space-y-1.5 text-xs sm:text-sm text-[#65554D]">
                            <p className="leading-relaxed font-medium text-[#3E312C]">
                                {ad.line1}{ad.line2 ? `, ${ad.line2}` : ""}
                            </p>
                            {ad.landmark && (
                                <p className="text-xs text-[#65554D]">
                                    <strong className="text-[#3E312C]">Landmark:</strong> {ad.landmark}
                                </p>
                            )}
                            <p className="text-xs font-bold text-[#3F5B43]">
                                {[ad.city, ad.state].filter(Boolean).join(', ')} {ad.pincode ? `- ${ad.pincode}` : ""}
                            </p>
                        </div>

                        {/* Action Buttons Toolbar */}
                        <div className="pt-3 border-t border-[#ECE2D3] flex items-center justify-end gap-2">
                            <button
                                onClick={() => onEdit(ad, idx)}
                                className="px-3 py-1.5 text-xs font-semibold text-[#3E312C] bg-[#FCF8F3] hover:bg-[#ECE2D3] border border-[#ECE2D3] rounded-[10px] transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                <Edit3 className="w-3.5 h-3.5 text-[#3F5B43]" /> Edit
                            </button>
                            <button
                                onClick={() => onDelete(ad)}
                                className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-[10px] transition-colors flex items-center gap-1.5 cursor-pointer"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                        </div>
                    </motion.div>
                )) : (
                    <div className="p-8 sm:p-10 border border-dashed border-[#ECE2D3] rounded-[24px] text-center text-[#65554D] text-xs sm:text-sm glass-card bg-[#FFFDF9]/50">
                        <MapPin className="w-8 h-8 text-[#3F5B43] mx-auto mb-2 opacity-60" />
                        <p className="font-bold text-[#3E312C] mb-1">No saved addresses found</p>
                        <p className="text-xs text-[#65554D]">Add a delivery address to speed up your 3D print checkout!</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function AddressForm({
    newAddress,
    setNewAddress,
    onSubmit,
    loading,
    isEditing
}: {
    newAddress: any,
    setNewAddress: any,
    onSubmit: any,
    loading: boolean,
    isEditing: boolean
}) {
    const tags = ["Home", "Office", "Other"];

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 glass-card p-5 sm:p-7 rounded-[28px] border border-[#ECE2D3] bg-[#FFFDF9] shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-1.5">Contact Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={newAddress.name}
                        onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-1.5">Mobile Number</label>
                    <input
                        type="tel"
                        placeholder="e.g. +91 9876543210"
                        value={newAddress.mobile}
                        onChange={e => setNewAddress({ ...newAddress, mobile: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-1.5">
                    Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Flat / House No, Building Name, Street, Area"
                    value={newAddress.line1}
                    onChange={e => setNewAddress({ ...newAddress, line1: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                    required
                />
            </div>

            <div>
                <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-1.5">Address Line 2</label>
                <input
                    type="text"
                    placeholder="Apartment, Suite, Wing (Optional)"
                    value={newAddress.line2}
                    onChange={e => setNewAddress({ ...newAddress, line2: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                />
            </div>

            <div>
                <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-1.5">Nearest Landmark</label>
                <input
                    type="text"
                    placeholder="e.g. Opposite City Park"
                    value={newAddress.landmark}
                    onChange={e => setNewAddress({ ...newAddress, landmark: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                    <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-1.5">
                        City <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Pune"
                        value={newAddress.city}
                        onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-1.5">
                        Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="411061"
                        value={newAddress.pincode}
                        onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-1.5">
                        State <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Maharashtra"
                        value={newAddress.state}
                        onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-2">Address Tag</label>
                <div className="flex gap-2">
                    {tags.map(tag => (
                        <button
                            type="button"
                            key={tag}
                            onClick={() => setNewAddress((prev: any) => ({ ...prev, tag }))}
                            className={`flex-1 py-2.5 rounded-[14px] text-xs font-bold border transition-all cursor-pointer ${newAddress.tag === tag
                                ? 'bg-[#3F5B43] text-white border-[#3F5B43] shadow-xs'
                                : 'bg-[#FFFDF9] text-[#65554D] border-[#ECE2D3] hover:border-[#7B8F63]'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-xs sm:text-sm font-semibold shadow-md disabled:opacity-50 mt-2 cursor-pointer active:scale-95 transition-all"
            >
                {loading ? "Saving Details..." : isEditing ? "Update Saved Address" : "Save Delivery Address"}
            </button>
        </form>
    );
}