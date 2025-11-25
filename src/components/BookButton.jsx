"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const BookButton = ({ onBookedText = "Service Booked!", message = "Thank you." }) => {
    const router = useRouter();

    const handleClick = () => {
        Swal.fire({
            icon: "success",
            title: onBookedText,
            text: message,
            confirmButtonText: "OK",
        }).then(() => {
            router.push("/services");
        });
    };

    return (
        <button onClick={handleClick} className="btn btn-primary">
            Book Now
        </button>
    );
};

export default BookButton;
