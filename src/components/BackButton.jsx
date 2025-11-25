"use client"; // must be at the very top

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="btn btn-xs btn-outline hover:btn-primary mb-5"
        >
            <FaArrowLeft /> Back to previous Page
        </button>
    );
};

export default BackButton;
