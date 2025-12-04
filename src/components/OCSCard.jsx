"use client";

import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import MyBtn from "./MyBtn";

const clamp = (n, min, max) => Math.min(Math.max(n ?? 0, min), max);

const OCSCard = ({ pet = {} }) => {
    const { image, serviceName, rating: rawRating, _id, id, price } = pet;
    const idForLink = _id ?? id;

    const rating = clamp(Math.round(Number(rawRating) || 0), 0, 5);
    const [hovered, setHovered] = useState(false);

    const hoverAnim = useSpring({
        transform: hovered ? "scale(1.05)" : "scale(1)",
        boxShadow: hovered
            ? "0px 10px 25px rgba(0,0,0,0.12)"
            : "0px 5px 15px rgba(0,0,0,0.08)",
        config: { tension: 200, friction: 15 }
    });

    const imgSrc = image || "/images/service-placeholder.jpg";

    const formattedPrice =
        typeof price === "number"
            ? `$${price}`
            : price
                ? `${price}$`
                : "Contact";

    return (
        <animated.div
            style={hoverAnim}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="bg-white rounded-2xl p-4 transition-transform space-y-3"
        >
            {/* Image */}
            <div className="relative w-full h-52 rounded-xl overflow-hidden">
                <Image
                    src={imgSrc}
                    alt={serviceName || "Service Image"}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            {/* Name */}
            <h3 className="font-bold text-xl">
                {serviceName ?? "Untitled Service"}
            </h3>

            {/* Rating */}
            <div className="flex gap-2 items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                        key={i}
                        className={i < rating ? "text-yellow-400" : "text-gray-300"}
                    />
                ))}
                <span className="text-sm text-gray-600">({rating})</span>
            </div>

            {/* Price */}
            <p className="text-primary font-semibold">
                Price: {formattedPrice}
            </p>

            {/* Button */}
            <MyBtn to={`/services/${idForLink}`} className="mt-2">
                View Details
            </MyBtn>
        </animated.div>
    );
};

export default OCSCard;
