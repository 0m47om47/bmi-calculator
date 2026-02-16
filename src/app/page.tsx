"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/login");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-white text-xl font-semibold animate-pulse">
                Redirecting...
            </div>
        </div>
    );
}
