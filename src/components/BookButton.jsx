"use client";

import React from "react";
import Swal from "sweetalert2";

const BookButton = ({ onBookedText = "Service Booked!", message = "Thank you." }) => {
    const handleClick = () => {
        // client-only code that uses SweetAlert2
        Swal.fire({
            icon: "success",
            title: onBookedText,
            text: message,
        });
    };

    return (
        <button onClick={handleClick} className="btn btn-primary">
            Book Now
        </button>
    );
};

export default BookButton;
