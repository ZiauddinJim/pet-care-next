"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BiHomeAlt, BiArrowBack } from "react-icons/bi";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-5 text-center">
            <h1 className="text-5xl font-bold text-primary mb-3">404</h1>
            <p className="text-xl text-gray-700 mb-6">
                Oops! The page you are looking for does not exist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                {/* Go Home Button */}
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition"
                >
                    <BiHomeAlt size={20} />
                    Go Home
                </button>

                {/* Go Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
                >
                    <BiArrowBack size={20} />
                    Go Back
                </button>
            </div>
        </div>
    );
}
