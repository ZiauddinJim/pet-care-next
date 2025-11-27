// components/NavbarNoAuth.jsx
"use client";

import React, { useContext } from "react";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import Link from "next/link";
import { BiMenuAltLeft } from "react-icons/bi";
import logo from "../../public/assets/logo.png";
import Image from "next/image";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, signOutFun } = useContext(AuthContext)
    const links = (
        <>
            <li><MyLink to="/">Home</MyLink></li>
            <li><MyLink to="/services">Services</MyLink></li>
            <li><MyLink to="/myBookConsultation">My Booking slot</MyLink></li>
            <li><MyLink to="/profile">My Profile</MyLink></li>
        </>
    );
    const handleLogout = () => {
        // console.log("Click logout");
        signOutFun()
            .then(() => {
                toast.success("Logout successful!")
            }).catch((error) => {
                // An error happened.
                toast.error("Logout failed: " + error.message);
            });
    }

    return (
        <div className="bg-base-100 shadow-lg">
            <MyContainer className="navbar">
                <div className="navbar-start items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <BiMenuAltLeft />
                        </div>
                        <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center gap-1">
                        <Image src={logo} alt="logo" className="w-8 h-8" />
                        <h1 className="text-primary font-bold text-lg lg:text-2xl">Pet Care</h1>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                <div className="navbar-end">
                    {
                        user
                            ? <div className="flex gap-2">
                                <div className="dropdown dropdown-center">
                                    <div tabIndex={0} role="button" className="cursor-pointer">
                                        <Image src={user?.photoURL && user.photoURL.trim() !== ""
                                            ? user.photoURL : "/assets/user.png"} alt="User Picture" width={50} height={50}
                                            className="w-12 h-12 rounded-full border-2 border-[#003453] p-1"
                                        />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu dropdown-content z-50 bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                                        <p className="font-medium text-lg mb-3">My Account</p>
                                        <Link href="/profile" className="btn btn-outline btn-primary mb-2">
                                            Profile</Link>
                                        <li onClick={handleLogout} className="btn btn-outline btn-primary">
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                                <button onClick={handleLogout} className="btn btn-primary font-medium">
                                    Logout
                                </button>
                            </div>
                            : <Link href={'/login'} className="btn btn-primary font-medium">Login / Register</Link>
                    }
                    {/* <Link href="/login" className="btn btn-primary font-medium">Login / Register</Link> */}
                </div>
            </MyContainer>
        </div>
    );
};

export default Navbar;
