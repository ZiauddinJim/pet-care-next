import Link from 'next/link';
import React from 'react';
import { BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
    const links = (
        <>
            <li>
                <Link className='active:text-secondary' href={'/'}>Home</Link>
            </li>
            <li>
                <Link href={'/services'}>Services</Link>
            </li>
            <li>
                <Link href={'/profile'}>My Profile</Link>
            </li>
        </>
    );
    return (
        <footer className="footer footer-horizontal footer-center bg-primary text-base-100 rounded p-10">
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