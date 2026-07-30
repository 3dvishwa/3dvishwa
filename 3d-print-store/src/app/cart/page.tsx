"use client";

import { useCart } from "../../components/CartContext";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ShoppingBag, MapPin, Plus, Trash2, ArrowRight, ShieldCheck, CreditCard, Sparkles, CheckCircle2, Truck } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const cart = useCart() || {};
  const { state = { items: [] }, removeItem, updateQty } = cart;
  const items = state?.items || [];
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [addingNew, setAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    mobile: "",
    line1: "",
    line2: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    tag: "Home",
  });

  // Hydration-safe mount flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if user not logged in
  useEffect(() => {
    if (mounted && !auth.currentUser) {
      router.push("/login");
    }
  }, [mounted, router]);

  // Reset newAddress user details when auth state updates
  useEffect(() => {
    if (auth.currentUser) {
      setNewAddress(prev => ({
        ...prev,
        name: auth.currentUser?.displayName || "",
        mobile: auth.currentUser?.phoneNumber || "",
      }));
    }
  }, [auth.currentUser]);

  // Fetch saved addresses of current user
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const fetchAddresses = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setAddresses(data.addresses || []);
          if ((data.addresses || []).length) setSelectedAddress(data.addresses[0]);
        }
      } catch (error) {
        toast.error("Failed to fetch addresses.");
        console.error(error);
      }
    };
    fetchAddresses();
  }, [mounted, auth.currentUser]);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-[#65554D] text-sm font-semibold animate-pulse">Loading cart details...</p>
      </div>
    );
  }

  // Calculate total price in paise safely
  const totalPaise = items.reduce((sum: number, item: any) => {
    const price = Number(item.pricePaise) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  // Save new address handler
  const saveNewAddress = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return toast.error("Please login first");

    const updatedNewAddress = {
      ...newAddress,
      name: newAddress.name.trim() || auth.currentUser?.displayName || "",
      mobile: newAddress.mobile.trim() || auth.currentUser?.phoneNumber || "",
    };

    if (!updatedNewAddress.line1.trim() || !updatedNewAddress.city.trim() || !updatedNewAddress.pincode.trim() || !updatedNewAddress.state.trim()) {
      return toast.error("Please fill all required address fields");
    }

    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { addresses: arrayUnion(updatedNewAddress) });
      setAddresses([...addresses, updatedNewAddress]);
      setSelectedAddress(updatedNewAddress);
      setAddingNew(false);
      setNewAddress({
        name: auth.currentUser?.displayName || "",
        mobile: auth.currentUser?.phoneNumber || "",
        line1: "",
        line2: "",
        landmark: "",
        city: "",
        pincode: "",
        state: "",
        tag: "Home",
      });
      toast.success("Address saved successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save address: " + err.message);
    }
  };

  // Checkout handler
  const checkout = async () => {
    if (!items.length) return toast.error("Cart is empty");
    if (!selectedAddress) return toast.error("Please select a delivery address");

    const defaultBase = typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:3000/api"
      : "https://3dvishwa.com/api";

    const url = process.env.NEXT_PUBLIC_API_BASE_URL || defaultBase;

    setLoading(true);
    const toastId = toast.loading("Initializing secure checkout...");

    try {
      const resp = await fetch(`${url}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
          customer: {
            userId: auth.currentUser?.uid || null,
            name: selectedAddress.name,
            mobile: selectedAddress.mobile,
            address: selectedAddress,
          },
        }),
      });

      const data = await resp.json();
      if (!data.ok) throw new Error(data.error || "Order creation failed");

      const { razorpayOrderId, amountPaise, keyId, orderId } = data;
      toast.dismiss(toastId);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: keyId,
          amount: amountPaise,
          currency: "INR",
          name: "3D Vishwa",
          description: "3D Print Order Payment",
          order_id: razorpayOrderId,
          handler: async (response: any) => {
            const verifyToast = toast.loading("Verifying payment...");
            try {
              const verify = await fetch(`${url}/verify-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...response,
                  orderId,
                }),
              });
              const vData = await verify.json();
              if (vData.ok) {
                toast.success("Payment successful! Order confirmed.", { id: verifyToast });
                items.forEach((item: any) => removeItem(item.productId, item.variantId));
                router.push("/profile");
              } else {
                toast.error("Payment verification failed: " + vData.error, { id: verifyToast });
              }
            } catch (err: any) {
              toast.error("Verification error: " + err.message, { id: verifyToast });
            }
          },
          prefill: {
            name: selectedAddress.name,
            email: auth.currentUser?.email || "",
            contact: selectedAddress.mobile,
          },
          theme: { color: "#3F5B43" },
        };
        //@ts-ignore
        new window.Razorpay(options).open();
      };
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error("Checkout failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const tags = ["Home", "Work", "Other"];

  return (
    <div className="max-w-[1280px] mx-auto py-8 sm:py-12 px-4 sm:px-6 text-[#3E312C] font-sans">
      <Toaster position="top-right" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 border-b border-[#ECE2D3] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Checkout Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">
            Shopping Cart & Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#65554D] mt-1">
            Review your custom 3D printed creations and complete your order securely.
          </p>
        </div>
        <Link href="/products" className="btn-secondary inline-flex items-center gap-2 text-xs font-bold py-2.5 px-4 self-start sm:self-auto">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {!items.length ? (
        /* Empty State */
        <div className="glass-card rounded-[28px] border border-[#ECE2D3] p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs bg-[#FFFDF9]">
          <div className="w-16 h-16 bg-[#FCF8F3] border border-[#ECE2D3] rounded-[22px] flex items-center justify-center text-[#3F5B43] mx-auto shadow-xs">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-[#3E312C]">Your Cart is Empty</h2>
          <p className="text-[#65554D] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            Explore our catalog of custom lithophanes, keychains, and divine idols or request a bespoke 3D CAD design.
          </p>
          <Link href="/products" className="btn-primary inline-block font-semibold text-xs sm:text-sm py-3 px-6 shadow-md cursor-pointer active:scale-95">
            Explore Catalog
          </Link>
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Items List & Address Selection */}
          <div className="lg:col-span-8 space-y-8">

            {/* Cart Items Card */}
            <div className="glass-card rounded-[28px] border border-[#ECE2D3] p-6 sm:p-8 bg-[#FFFDF9] shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#ECE2D3]">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#3E312C] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#3F5B43]" /> Cart Items
                </h2>
                <span className="text-xs font-extrabold text-[#3F5B43] bg-[#7B8F63]/10 border border-[#7B8F63]/20 px-3 py-1 rounded-full">
                  {items.length} {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              <ul className="divide-y divide-[#ECE2D3]">
                {items.map((item: any) => {
                  const qty = Number(item.qty) || 1;
                  return (
                    <li
                      key={`${item.productId}-${item.variantId}`}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-[16px] bg-[#FCF8F3] border border-[#ECE2D3] overflow-hidden flex-shrink-0 relative p-1 flex items-center justify-center">
                          <img
                            src={item.images?.[0] || "/placeholder.png"}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#3E312C] text-sm sm:text-base">{item.name}</div>
                          {item.size && (
                            <div className="text-xs font-semibold text-[#65554D] mt-0.5">
                              Variant / Size: <span className="text-[#3E312C]">{item.size}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#ECE2D3] rounded-[14px] bg-[#FFFDF9] overflow-hidden shadow-xs">
                          <button
                            onClick={() => {
                              if (qty > 1) updateQty(item.productId, item.variantId, qty - 1);
                            }}
                            className="px-3 py-1.5 bg-[#FCF8F3] hover:bg-[#ECE2D3] transition text-[#3E312C] font-bold text-xs border-r border-[#ECE2D3] cursor-pointer"
                          >
                            –
                          </button>
                          <span className="px-3.5 text-xs font-bold text-[#3E312C]">{qty}</span>
                          <button
                            onClick={() => updateQty(item.productId, item.variantId, qty + 1)}
                            className="px-3 py-1.5 bg-[#FCF8F3] hover:bg-[#ECE2D3] transition text-[#3E312C] font-bold text-xs border-l border-[#ECE2D3] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price Display */}
                        <div className="font-extrabold text-[#3E312C] text-base sm:text-lg">
                          ₹{(((Number(item.pricePaise) || 0) * qty) / 100).toLocaleString('en-IN')}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="p-2 text-[#65554D] hover:text-[#B8724A] hover:bg-[#FCF8F3] rounded-[12px] border border-transparent hover:border-[#ECE2D3] transition-all cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Delivery Address Section */}
            <div className="glass-card rounded-[28px] border border-[#ECE2D3] p-6 sm:p-8 bg-[#FFFDF9] shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#ECE2D3]">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#3E312C] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#3F5B43]" /> Delivery Address
                </h2>
                {!addingNew && addresses.length > 0 && (
                  <button
                    onClick={() => setAddingNew(true)}
                    className="text-xs font-bold text-[#3F5B43] hover:text-[#7B8F63] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                )}
              </div>

              {!addingNew && addresses.length ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((ad, idx) => {
                      const isSelected = selectedAddress === ad;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedAddress(ad)}
                          className={`p-5 rounded-[22px] border cursor-pointer transition-all relative bg-[#FFFDF9] ${isSelected
                            ? "border-[#3F5B43] shadow-xs ring-2 ring-[#3F5B43]/20 bg-[#FCF8F3]/60"
                            : "border-[#ECE2D3] hover:border-[#7B8F63]"
                            }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-extrabold text-[#3E312C] text-sm flex items-center gap-1.5">
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-[#3F5B43]" />}
                              {ad.name}
                            </span>
                            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-[#7B8F63]/10 text-[#3F5B43] rounded-full border border-[#7B8F63]/20 uppercase tracking-wider">
                              {ad.tag || "Home"}
                            </span>
                          </div>
                          <p className="text-xs text-[#65554D] font-semibold mb-1">📞 {ad.mobile}</p>
                          <p className="text-xs text-[#65554D] leading-relaxed">{ad.line1}{ad.line2 ? `, ${ad.line2}` : ""}</p>
                          {ad.landmark && <p className="text-xs text-[#65554D] mt-0.5">Landmark: {ad.landmark}</p>}
                          <p className="text-xs text-[#3E312C] font-semibold mt-1">
                            {ad.city} - {ad.pincode}, {ad.state}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* New Address Form */
                <div className="bg-[#FCF8F3] border border-[#ECE2D3] rounded-[24px] p-6 space-y-4">
                  <h3 className="font-extrabold text-[#3E312C] text-xs uppercase tracking-wider">Enter Shipping Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={newAddress.mobile}
                      onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address Line 1 (House No, Building, Area)*"
                    value={newAddress.line1}
                    onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20"
                  />
                  <input
                    type="text"
                    placeholder="Address Line 2 (Apartment, Suite)"
                    value={newAddress.line2}
                    onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20"
                  />
                  <input
                    type="text"
                    placeholder="Nearest Landmark"
                    value={newAddress.landmark}
                    onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="City*"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20"
                    />
                    <input
                      type="text"
                      placeholder="Pincode*"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20"
                    />
                    <input
                      type="text"
                      placeholder="State*"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#65554D] uppercase tracking-wider mb-2">Address Tag</label>
                    <div className="flex gap-2">
                      {tags.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setNewAddress({ ...newAddress, tag: t })}
                          className={`flex-1 py-2 rounded-[14px] text-xs font-bold border transition-all cursor-pointer ${newAddress.tag === t
                            ? "bg-[#3F5B43] text-white border-[#3F5B43] shadow-xs"
                            : "bg-[#FFFDF9] text-[#65554D] border-[#ECE2D3] hover:border-[#7B8F63]"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={saveNewAddress}
                      disabled={loading}
                      className="btn-primary py-3.5 px-6 text-xs font-semibold shadow-md disabled:opacity-50 cursor-pointer active:scale-95"
                    >
                      {loading ? "Saving Address..." : "Save Delivery Address"}
                    </button>
                    {addresses.length > 0 && (
                      <button
                        onClick={() => setAddingNew(false)}
                        disabled={loading}
                        className="btn-secondary py-3.5 px-6 text-xs font-semibold disabled:opacity-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Order Summary & Checkout Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="glass-card rounded-[28px] border border-[#ECE2D3] p-6 sm:p-8 space-y-6 bg-[#FFFDF9] shadow-xs">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#3E312C] flex items-center gap-2 pb-4 border-b border-[#ECE2D3]">
                <CreditCard className="w-5 h-5 text-[#3F5B43]" /> Order Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-[#65554D]">
                <div className="flex justify-between py-2 border-b border-[#ECE2D3]">
                  <span>Items Subtotal ({items.length})</span>
                  <span className="font-bold text-[#3E312C]">₹{(totalPaise / 100).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#ECE2D3]">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#3F5B43]" /> Delivery Charges
                  </span>
                  <span className="font-extrabold text-[#3F5B43] uppercase text-xs bg-[#7B8F63]/10 border border-[#7B8F63]/20 px-2.5 py-0.5 rounded-full">
                    FREE
                  </span>
                </div>
                <div className="flex justify-between py-2 text-base font-extrabold text-[#3E312C]">
                  <span>Total Payable</span>
                  <span className="text-[#3F5B43] text-xl font-black">₹{(totalPaise / 100).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={checkout}
                disabled={loading}
                className="btn-primary w-full py-4 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                {loading ? "Initializing Razorpay..." : `Proceed to Pay ₹${(totalPaise / 100).toLocaleString('en-IN')}`}
                <ShieldCheck className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-[11px] text-[#65554D] font-medium flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3F5B43]" /> 256-Bit SSL Encrypted Razorpay Gateway
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}