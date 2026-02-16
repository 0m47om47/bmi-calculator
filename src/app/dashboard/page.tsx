"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
    id: string;
    name: string;
    email: string;
}

function getCategoryColor(category: string) {
    switch (category) {
        case "Underweight":
            return "bg-blue-500/20 text-blue-200 border-blue-400/30";
        case "Normal":
            return "bg-green-500/20 text-green-200 border-green-400/30";
        case "Overweight":
            return "bg-yellow-500/20 text-yellow-200 border-yellow-400/30";
        case "Obese":
            return "bg-red-500/20 text-red-200 border-red-400/30";
        default:
            return "bg-gray-500/20 text-gray-200 border-gray-400/30";
    }
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);

    // Check auth
    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(() => {
                router.replace("/login");
            });
    }, [router]);



    const calculateBMI = () => {
        const h = Number(height) / 100;
        const w = Number(weight);

        if (!h || !w) {
            alert("Fill both height and weight");
            return;
        }

        const result = w / (h * h);
        const bmiValue = Number(result.toFixed(2));
        setBmi(bmiValue);

        let cat = "";
        if (bmiValue < 18.5) cat = "Underweight";
        else if (bmiValue < 25) cat = "Normal";
        else if (bmiValue < 30) cat = "Overweight";
        else cat = "Obese";

        setCategory(cat);
        setHeight("");
        setWeight("");
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/login");
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white text-xl font-semibold animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-10">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-md border-b border-white/10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-white font-semibold text-lg leading-tight">
                                {user?.name || "User"}
                            </h2>
                            <p className="text-white/50 text-xs">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="max-w-xl mx-auto px-4 mt-8">
                {/* Calculator Card */}
                <div className="animate-fadeInUp bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        BMI Calculator
                    </h1>

                    <div className="space-y-4">
                        <div>
                            <label className="text-white/60 text-sm mb-1 block">Height (cm)</label>
                            <input
                                type="number"
                                placeholder="e.g. 175"
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-white/60 text-sm mb-1 block">Weight (kg)</label>
                            <input
                                type="number"
                                placeholder="e.g. 70"
                                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={calculateBMI}
                            className="w-full bg-white text-purple-700 font-semibold p-3 rounded-xl hover:bg-white/90 transition transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Calculate BMI
                        </button>
                    </div>

                    {/* Result */}
                    {bmi && (
                        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-center animate-fadeInUp">
                            <p className="text-white/60 text-sm">Your BMI</p>
                            <p className="text-4xl font-bold text-white mt-1">{bmi}</p>
                            <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}>
                                {category}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
