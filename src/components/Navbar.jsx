// components/NavbarNoAuth.jsx
"use client";

import React from "react";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import Link from "next/link";
import { BiMenuAltLeft } from "react-icons/bi";
import logo from "../assets/logo.png";
import Image from "next/image";

const Navbar = () => {
    const links = (
        <>
            <li><MyLink to="/">Home</MyLink></li>
            <li><MyLink to="/services">Services</MyLink></li>
            <li><MyLink to="/profile">My Profile</MyLink></li>
        </>
    );

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
                    {/* No auth: always show login/register */}
                    <Link href="/login" className="btn btn-primary font-medium">Login / Register</Link>
                </div>
            </MyContainer>
        </div>
    );
};

export default Navbar;
