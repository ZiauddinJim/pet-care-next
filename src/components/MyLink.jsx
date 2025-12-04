// components/MyLink.jsx
// "use client"; // required if using usePathname in app router

import Link from "next/link";
import { usePathname } from "next/navigation";

const MyLink = ({ to = "/", className = "", children }) => {
    const pathname = usePathname();
    const isActive = pathname === to;

    const base = `${className} text-primary hover:text-secondary`;
    const activeClass = "text-white bg-primary";

    return (
        <Link href={to} className={isActive ? activeClass : base}>
            {children}
        </Link>
    );
};

export default MyLink;
