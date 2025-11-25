"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "./AuthContext";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        // once loading completes, if no user then redirect
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return <Spinner />;
    }

    // If user exists, render children
    return <>{children}</>;
}
