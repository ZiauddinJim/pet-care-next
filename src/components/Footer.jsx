"use client";
import Link from 'next/link';
import React, { useContext } from 'react';
import { BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import AuthContext from './AuthContext';
import Image from 'next/image';
import logo from "../../public/assets/logo.png";


const Footer = () => {
    const { user } = useContext(AuthContext)
    const links = (
        <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/careTips">Care Tips</Link></li>
            <li><Link href="/ourTeam">Our Team</Link></li>
            {
                user &&
                <>
                    <li><Link href="/myBookConsultation">My Booking slot</Link></li>
                    <li><Link href="/profile">My Profile</Link></li>
                </>
            }
        </>
    );
    return (
        <footer className="footer footer-horizontal footer-center bg-primary text-base-100 rounded p-10">
            <Link href="/" className="flex items-center gap-1">
                <Image src={logo} alt="logo" className="w-8 h-8" />
                <h1 className="text-White font-bold text-lg lg:text-2xl">Pet Care</h1>
            </Link>
            <ul className="grid grid-flow-col gap-4">
                {links}
            </ul>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a target='_blank' href='https://x.com/'>
                        <BsTwitter size={24} />
                    </a>
                    <a target='_blank' href='https://www.youtube.com/'>
                        <BsYoutube size={24} />
                    </a>
                    <a target='_blank' href='https://www.facebook.com/'>
                        <FaFacebook size={24} />
                    </a>
                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Pet Care In Winter LTD.</p>
            </aside>
        </footer>
    );
};

export default Footer;