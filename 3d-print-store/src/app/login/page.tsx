'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, db, googleProvider } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { ArrowRight, ShieldCheck, Mail, Lock, User, Phone, X } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "", name: "", mobile: "" });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isExistingUser, setIsExistingUser] = useState(true);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showGoogleModal, setShowGoogleModal] = useState(false);

    // Redirect ONLY if Firebase user exists AND a valid server session cookie is active
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && !loading) {
                try {
                    // Check if server HTTP-only session cookie exists before auto-redirecting
                    const res = await fetch("/api/auth/session", { method: "GET" });

                    if (res.ok) {
                        const snap = await getDoc(doc(db, "users", user.uid));
                        const userType = snap.exists() ? snap.data()?.userType : "Customer";
                        window.location.replace(userType === "Admin" ? "/admin" : "/profile");
                    }
                } catch (err) {
                    console.error("Session verification failed:", err);
                }
            }
        });
        return () => unsubscribe();
    }, [router, loading]);

    // Helper: Exchange Firebase ID Token for Server Session Cookie
    const syncServerSession = async (user: any) => {
        const idToken = await user.getIdToken();
        const res = await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ idToken }),
        });

        if (!res.ok) {
            throw new Error("Failed to set server session cookie");
        }
    };

    //----------------------------------------
    // EMAIL SIGN-UP
    //----------------------------------------
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreedToTerms) {
            toast.error("Please agree to the Terms & Conditions and Privacy Policy to continue.");
            return;
        }

        setLoading(true);

        try {
            const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);

            const userData = {
                name: form.name,
                mobile: form.mobile,
                email: form.email,
                addresses: [],
                userType: "Customer",
                termsAgreedAt: new Date().toISOString(),
                createdAt: new Date().toISOString()
            };

            await setDoc(doc(db, "users", cred.user.uid), userData);

            // Sync server session cookie
            await syncServerSession(cred.user);

            sessionStorage.setItem("userData", JSON.stringify({
                uid: cred.user.uid,
                name: form.name,
                email: form.email
            }));

            toast.success("Account created successfully!");
            window.location.replace("/profile");

        } catch (err: any) {
            toast.error(err.message || "Failed to sign up");
            console.error("Signup error:", err);
            setLoading(false);
        }
    };

    //----------------------------------------
    // EMAIL SIGN-IN
    //----------------------------------------
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
            const snap = await getDoc(doc(db, "users", cred.user.uid));

            // Sync server session cookie
            await syncServerSession(cred.user);

            let userType = "Customer";
            if (snap.exists()) {
                const data = snap.data();
                userType = data?.userType || "Customer";
                sessionStorage.setItem("userData", JSON.stringify(data));
            }

            toast.success("Welcome back!");
            window.location.replace(userType === "Admin" ? "/admin" : "/profile");

        } catch (err: any) {
            toast.error("Invalid email or password");
            console.error("Sign-in error:", err);
            setLoading(false);
        }
    };

    //----------------------------------------
    // PASSWORD RESET
    //----------------------------------------
    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success("Password reset link sent to your email!");
            setShowResetPassword(false);
            setResetEmail("");

        } catch (err: any) {
            toast.error("Failed to send reset email");
            console.error("Reset error:", err);
        } finally {
            setLoading(false);
        }
    };

    //----------------------------------------
    // GOOGLE SIGN-IN EXECUTION
    //----------------------------------------
    const executeGoogleSignIn = async () => {
        setShowGoogleModal(false);
        setLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);

            let userType = "Customer";

            if (!snap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName || "Customer",
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date().toISOString(),
                    termsAgreedAt: new Date().toISOString(),
                    userType: "Customer",
                    addresses: [],
                });
            } else {
                userType = snap.data()?.userType || "Customer";
            }

            // Sync server session cookie
            await syncServerSession(user);

            sessionStorage.setItem("userData", JSON.stringify({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }));

            window.location.replace(userType === "Admin" ? "/admin" : "/profile");

        } catch (err: any) {
            toast.error("Google sign-in failed");
            console.error("Google sign-in error:", err);
            setLoading(false);
        }
    };

    //----------------------------------------
    // UI
    //----------------------------------------
    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 text-[#3E312C] font-sans relative">
            <Toaster position="top-right" />

            <div className="w-full max-w-[440px] glass-card rounded-[24px] p-8 sm:p-10 transition-all">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-[14px] bg-[#FCF8F3] border border-[#ECE2D3] text-[#3F5B43] mb-3">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-[#3E312C] tracking-tight">
                        {showResetPassword ? "Reset Password" : isExistingUser ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#65554D] mt-1">
                        {showResetPassword
                            ? "Enter your email to receive recovery instructions"
                            : isExistingUser
                                ? "Sign in to manage your 3D print orders"
                                : "Join 3D Vishwa for custom lithophanes & prints"}
                    </p>
                </div>

                {!showResetPassword && (
                    <>
                        {/* GOOGLE LOGIN BUTTON */}
                        <button
                            type="button"
                            onClick={() => setShowGoogleModal(true)}
                            disabled={loading}
                            className="btn-secondary w-full flex items-center justify-center gap-3 py-3.5 px-4 text-xs font-semibold shadow-sm mb-6 disabled:opacity-50 cursor-pointer active:scale-95"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            Continue with Google
                        </button>

                        {/* OR DIVIDER */}
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t border-[#ECE2D3]" />
                            <span className="mx-4 text-xs font-semibold uppercase text-[#65554D] tracking-wider">or email</span>
                            <hr className="flex-grow border-t border-[#ECE2D3]" />
                        </div>

                        {/* EMAIL/PASSWORD FORM */}
                        <form
                            onSubmit={isExistingUser ? handleSignIn : handleSignup}
                            className="space-y-4"
                        >
                            {!isExistingUser && (
                                <>
                                    <div className="relative">
                                        <User className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3.5 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={form.mobile}
                                            onChange={e => setForm({ ...form, mobile: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3.5 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] transition-all"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3.5 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] transition-all"
                                    required
                                />
                            </div>

                            {/* TERMS & PRIVACY CONSENT CHECKBOX (FOR SIGN-UP ONLY) */}
                            {!isExistingUser && (
                                <div className="flex items-start gap-2.5 pt-1">
                                    <input
                                        type="checkbox"
                                        id="termsConsent"
                                        checked={agreedToTerms}
                                        onChange={e => setAgreedToTerms(e.target.checked)}
                                        className="mt-1 w-4 h-4 rounded border-[#ECE2D3] text-[#3F5B43] focus:ring-[#7B8F63] cursor-pointer"
                                        required
                                    />
                                    <label htmlFor="termsConsent" className="text-xs text-[#65554D] leading-relaxed cursor-pointer">
                                        I agree to the{" "}
                                        <Link href="/info/terms" target="_blank" className="text-[#3F5B43] font-bold underline hover:text-[#7B8F63]">
                                            Terms &amp; Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/info/privacy" target="_blank" className="text-[#3F5B43] font-bold underline hover:text-[#7B8F63]">
                                            Privacy Policy
                                        </Link>.
                                    </label>
                                </div>
                            )}

                            {isExistingUser && (
                                <div className="text-right">
                                    <span
                                        onClick={() => setShowResetPassword(true)}
                                        className="text-xs font-semibold text-[#3F5B43] hover:text-[#7B8F63] cursor-pointer transition-colors"
                                    >
                                        Forgot password?
                                    </span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-3.5 px-4 text-xs font-semibold shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                            >
                                {loading
                                    ? (isExistingUser ? "Signing In..." : "Creating Account...")
                                    : (isExistingUser ? "Sign In" : "Create Account")}
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="text-center pt-4 border-t border-[#ECE2D3]">
                                <p className="text-xs sm:text-sm text-[#65554D]">
                                    {isExistingUser ? "Don't have an account? " : "Already have an account? "}
                                    <span
                                        onClick={() => {
                                            setIsExistingUser(!isExistingUser);
                                            setAgreedToTerms(false);
                                        }}
                                        className="font-bold text-[#3F5B43] hover:text-[#7B8F63] cursor-pointer transition-colors"
                                    >
                                        {isExistingUser ? "Sign Up" : "Sign In"}
                                    </span>
                                </p>
                            </div>
                        </form>
                    </>
                )}

                {/* RESET PASSWORD */}
                {showResetPassword && (
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                            <input
                                type="email"
                                placeholder="Enter your registered email"
                                value={resetEmail}
                                onChange={e => setResetEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] text-[#3E312C] text-sm focus:outline-none focus:border-[#7B8F63] transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3.5 px-4 text-xs font-semibold shadow-md disabled:opacity-50 cursor-pointer active:scale-95"
                        >
                            {loading ? "Sending Link..." : "Send Reset Email"}
                        </button>

                        <div className="text-center pt-2">
                            <span
                                onClick={() => setShowResetPassword(false)}
                                className="text-xs sm:text-sm font-semibold text-[#3F5B43] hover:text-[#7B8F63] cursor-pointer transition-colors"
                            >
                                Back to Sign In
                            </span>
                        </div>
                    </form>
                )}
            </div>

            {/* GOOGLE TERMS & CONDITIONS CONSENT MODAL */}
            {showGoogleModal && (
                <div className="fixed inset-0 z-50 bg-[#3E312C]/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-[400px] glass-card bg-[#FFFDF9] rounded-[24px] p-6 shadow-xl border border-[#ECE2D3] space-y-5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-3 border-b border-[#ECE2D3]">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#3F5B43]" />
                                <h3 className="font-extrabold text-[#3E312C] text-base">Notice</h3>
                            </div>
                            <button
                                onClick={() => setShowGoogleModal(false)}
                                className="p-1 rounded-full text-[#65554D] hover:bg-[#FCF8F3] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-xs text-[#65554D] leading-relaxed">
                            To proceed with Google authentication, please agree to our{" "}
                            <Link href="/info/terms" target="_blank" className="text-[#3F5B43] font-bold underline hover:text-[#7B8F63]">
                                Terms of Use
                            </Link>{" "}
                            and{" "}
                            <Link href="/info/privacy" target="_blank" className="text-[#3F5B43] font-bold underline hover:text-[#7B8F63]">
                                Privacy Policy
                            </Link>.
                        </p>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowGoogleModal(false)}
                                className="btn-secondary py-2.5 px-4 text-xs font-semibold cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={executeGoogleSignIn}
                                className="btn-primary py-2.5 px-5 text-xs font-semibold shadow-md cursor-pointer active:scale-95"
                            >
                                Agree &amp; Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}