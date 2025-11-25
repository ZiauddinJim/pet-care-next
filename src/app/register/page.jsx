"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BsEye } from "react-icons/bs";
import { FaRegEyeSlash } from "react-icons/fa";

import toast from "react-hot-toast";
import AuthContext from "@/components/AuthContext";
import firebaseSignUpErrorHandle from "@/utils/firebaseSignUpErrorHandle";

const Register = () => {
    const {
        createUserSignInWithEmailFun,
        updateProfileFun,
        setLoading,
        signOutFun,
        setUser,
        googleSignInFun,
    } = useContext(AuthContext);

    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams?.get("from") || "/";

    const [show, setShow] = useState(false);

    // Password validation regex
    const hasUppercase = (s) => /[A-Z]/.test(s);
    const hasLowercase = (s) => /[a-z]/.test(s);
    const isLongEnough = (s) => s.length >= 6;

    const validatePassword = (pw) => {
        if (!hasUppercase(pw)) return "Password must contain at least one uppercase letter.";
        if (!hasLowercase(pw)) return "Password must contain at least one lowercase letter.";
        if (!isLongEnough(pw)) return "Password must be at least 6 characters long.";
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = e.target;
            const displayName = form.name.value;
            const photoURL = form.photoURL.value;
            const email = form.email.value;
            const password = form.password.value;

            const passwordError = validatePassword(password);
            if (passwordError) {
                toast.error(passwordError);
                setLoading(false);
                return;
            }

            await createUserSignInWithEmailFun(email, password);

            // Update profile
            await updateProfileFun(displayName, photoURL);

            // signOut so the user has to login (matches your original flow)
            await signOutFun();

            toast.success("Signup successful. Continue with Login.");
            form.reset();
            setUser(null);
            router.push("/auth/login");
        } catch (err) {
            firebaseSignUpErrorHandle(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoading(true);
        try {
            const userCredential = await googleSignInFun();
            const user = userCredential.user;
            toast.success(`Welcome, ${user.displayName || "User"}!`);
            router.push(from);
        } catch (err) {
            const error = err?.message || "";
            toast.error(error.includes("popup-closed-by-user") ? "Google Sign-In cancelled." : "Failed to sign in with Google. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // If your AuthContext exposes a `loading` state and you want to show a spinner,
    // you could use it, e.g. if (loading) return <Spinner />;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Head>
                <title>Register | Pet Care</title>
            </Head>
            <div className="md:max-w-md w-full px-4 py-4">
                <form onSubmit={handleRegister}>
                    {/* Top */}
                    <div className="mb-12">
                        <h1 className="text-slate-900 text-3xl font-bold">Join My Website Today</h1>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="label text-primary">Name</label>
                        <div className="relative flex items-center">
                            <input name="name" type="text" required
                                className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none"
                                placeholder="Enter your name" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mt-8">
                        <label className="label text-primary">Email</label>
                        <div className="relative flex items-center">
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none"
                                placeholder="Enter email"
                            />
                            <MdOutlineMail className="text-slate-500" />
                        </div>
                    </div>

                    {/* Photo URL */}
                    <div className="mt-8">
                        <label className="label text-primary">Photo URL</label>
                        <div className="relative flex items-center">
                            <input
                                name="photoURL"
                                type="text"
                                required
                                className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none"
                                placeholder="Enter your photo URL"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mt-8">
                        <label className="label text-primary">Password</label>
                        <div className="relative flex items-center">
                            <input
                                name="password"
                                type={show ? "text" : "password"}
                                required
                                className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none"
                                placeholder="Enter password"
                            />
                            <span onClick={() => setShow(!show)} className="text-slate-500 hover:text-secondary cursor-pointer">
                                {show ? <BsEye /> : <FaRegEyeSlash />}
                            </span>
                        </div>
                    </div>

                    {/* Terms checkbox */}
                    <div className="flex items-center mt-8">
                        <input type="checkbox" required className="checkbox checkbox-sm rounded text-secondary" />
                        <label className="ml-3 block text-sm text-slate-900">
                            I agree to the <Link href="/terms" className="text-secondary hover:underline">Terms</Link> and{" "}
                            <Link href="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>
                        </label>
                    </div>

                    {/* Button */}
                    <div className="mt-12">
                        <button type="submit" className="btn hover:btn-primary border-primary w-full shadow font-medium">
                            Register Now
                        </button>
                    </div>
                </form>

                <h3 className="text-[15px] mt-6 text-slate-600">
                    Already an account?{" "}
                    <Link href="/login" className="text-secondary font-medium hover:underline ml-1 whitespace-nowrap">
                        Login here
                    </Link>
                </h3>

                {/* OR */}
                <div className="my-6 flex items-center gap-4">
                    <hr className="w-full border-slate-300" />
                    <p className="text-sm text-slate-900 text-center">or</p>
                    <hr className="w-full border-slate-300" />
                </div>

                {/* Google */}
                <button onClick={handleGoogle} className="btn hover:btn-primary font-medium border-primary shadow w-full">
                    <FcGoogle />
                    Signin with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
