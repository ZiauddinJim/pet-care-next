"use client";

import React, { useContext, useRef, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import MyContainer from "@/components/MyContainer";
import AuthContext from "@/components/AuthContext";

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    const { signInFun, googleSignInFun } = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await signInFun(email, password);
            const user = result.user;

            toast.success(`Welcome back, ${user.displayName || "User"}!`);
            router.push(redirect);
        } catch (error) {
            let message = "Something went wrong. Please try again!";

            switch (error.code) {
                case "auth/invalid-email":
                    message = "Invalid email address!";
                    break;
                case "auth/user-disabled":
                    message = "This user has been disabled!";
                    break;
                case "auth/user-not-found":
                    message = "No user found with this email!";
                    break;
                case "auth/wrong-password":
                    message = "Incorrect password!";
                    break;
                case "auth/invalid-credential":
                    message = "Incorrect email or password!";
                    break;
                case "auth/network-request-failed":
                    message = "Network error! Check your internet.";
                    break;
            }

            toast.error(message);
        }
    };

    const handleGoogle = () => {
        googleSignInFun()
            .then((result) => {
                toast.success(`Welcome, ${result.user.displayName || "User"}!`);
                router.push(redirect);
            })
            .catch((err) => {
                toast.error(
                    err.message.includes("popup-closed-by-user")
                        ? "Google Sign-In cancelled."
                        : "Failed to sign in with Google."
                );
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <title>Login | Pet Care</title>

            <MyContainer className="flex flex-col  items-center gap-4 max-md:gap-8 max-w-6xl w-full p-4 shadow-xl rounded-md">
                <div className="md:max-w-md w-full px-4 py-4">
                    {/* Login Form */}
                    <form onSubmit={handleSignIn} className="mt-6">
                        <h1 className="text-2xl font-bold text-primary text-center">
                            Log in to your account
                        </h1>
                        <p className="text-gray-500 text-center mt-2">
                            Enter your email and password to login
                        </p>

                        {/* Email */}
                        <div className="mt-8">
                            <label className="text-primary">Email</label>
                            <div className="relative flex items-center">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none"
                                    placeholder="Enter email"
                                />
                                <MdOutlineMail className="absolute right-2 text-slate-500" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mt-8">
                            <label className="text-primary">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    name="password"
                                    type={show ? "text" : "password"}
                                    required
                                    className="w-full text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none"
                                    placeholder="Enter password"
                                />
                                <span
                                    onClick={() => setShow(!show)}
                                    className="absolute right-2 text-slate-500 cursor-pointer"
                                >
                                    {show ? <BsEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="mt-6">
                            <button type="button" className="text-secondary text-sm hover:underline">
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn border-primary hover:btn-primary w-full mt-10"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-[15px] mt-6 text-slate-600">
                        Don’t have an account?
                        <Link href="/register" className="text-secondary font-medium hover:underline ml-1">
                            Register here</Link>
                    </p>

                    {/* OR Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <hr className="w-full border-slate-300" />
                        <p className="text-sm text-slate-900">or</p>
                        <hr className="w-full border-slate-300" />
                    </div>

                    {/* Google Login */}
                    <button onClick={handleGoogle} className="btn border-primary hover:btn-primary w-full">
                        <FcGoogle />Sign in with Google</button>
                </div>
            </MyContainer>
        </div>
    );
};

export default LoginPage;
