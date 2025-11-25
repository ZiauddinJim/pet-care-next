"use client"; // required because we use state & react-spring

import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import MyBtn from "./MyBtn";

const clamp = (n, min, max) => Math.min(Math.max(n ?? 0, min), max);

const OCSCard = ({ pet = {} }) => {
    const { image, serviceName, description, rating: rawRating, _id, price } = pet;
    const rating = clamp(Math.round(Number(rawRating) || 0), 0, 5);

    const [hovered, setHovered] = useState(false);

    const fadeIn = useSpring({
        from: { opacity: 0, transform: "translateY(30px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: { tension: 120, friction: 14 }
    });

    const hoverAnim = useSpring({
        transform: hovered ? "scale(1.05)" : "scale(1)",
        boxShadow: hovered ? "0px 10px 25px rgba(0,0,0,0.15)" : "0px 5px 15px rgba(0,0,0,0.1)",
        config: { tension: 200, friction: 15 }
    });

    // safe image fallback
    const imgSrc = image || "/images/service-placeholder.jpg";

    // price formatting
    const formattedPrice =
        typeof price === "number"
            ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)
            : price ? `${price}$` : "Contact";

    return (
        <animated.div
            style={{ ...fadeIn, ...hoverAnim }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="bg-white rounded-2xl p-4 space-y-2 transition-transform"
            role="article"
            aria-label={`Service: ${serviceName}`}
        >
            <div className="relative rounded-xl w-full h-60 overflow-hidden">
                {/* next/image helps performance; width/height omitted for responsive by using layout='fill' */}
                <Image
                    src={imgSrc}
                    alt={serviceName || "service image"}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={false}
                />
            </div>

            <h3 className="font-bold text-xl mt-5">{serviceName ?? "Untitled service"}</h3>
            <p className="text-gray-500 line-clamp-3">{description ?? "No description provided."}</p>

            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-secondary">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                    <span className="ml-2 text-white bg-primary px-2 rounded">
                        {rating}
                    </span>
                </div>

                <div className="mr-2 text-secondary bg-orange-50 p-1 rounded-sm">
                    <strong className="text-primary mr-2">Price:</strong> {formattedPrice}
                </div>
            </div>

            <MyBtn to={`/services/${_id}`} className={"mt-5"} aria-label={`View details for ${serviceName}`}>
                View Details
            </MyBtn>
        </animated.div>
    );
};

export default OCSCard;
