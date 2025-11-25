"use client";
import React, { useEffect, useState } from "react";

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import AuthContext from "./AuthContext";

const provider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUserSignInWithEmailFun = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateProfileFun = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName, photoURL })
    }

    const signOutFun = () => {
        setLoading(true);
        return signOut(auth)
    }

    const signInFun = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignInFun = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }


    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUserSignInWithEmailFun,
        updateProfileFun,
        signOutFun,
        signInFun,
        googleSignInFun,
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        // Cleanup function create
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
}
