"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }
            router.push("/dashboard");
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="animate-fadeInUp bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-white/60 mt-2">Sign in to your BMI Calculator</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/20 border border-red-400/30 text-red-100 px-4 py-3 rounded-xl mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-white text-purple-700 font-semibold p-3 rounded-xl hover:bg-white/90 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-white/50 text-sm mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-white font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}