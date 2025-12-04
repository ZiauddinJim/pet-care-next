"use client";

import React from "react";
import Image from "next/image";
import MyContainer from "@/components/MyContainer";

const careTips = [
    {
        title: "Keep water from freezing",
        description:
            "Check and refresh outdoor water bowls several times a day. Use insulated or heated bowls if pets spend long periods outside.",
        image:
            "https://i.ibb.co/HfgjDQxM/How-to-Keep-Your-Dog-s-Water-from-Freezing-1200x800.jpg",
    },
    {
        title: "Protect paws from ice and salt",
        description:
            "Wipe paws after walks to remove ice, de-icing salts, and chemicals. Consider booties for long walks and regularly trim fur between paw pads.",
        image:
            "https://i.ibb.co/4nXr7KfP/images-q-tbn-ANd9-Gc-RW-tdznm-32518-Qui-Wkr-Sff-Pp-CF9ca-Wum-F05r-Rcw2qsx5n-Lc-BZ1-Zi-Fva-I2r-Acvz-E.jpg",
    },
    {
        title: "Avoid antifreeze exposure",
        description:
            "Store antifreeze/automotive fluids securely; even small spills are toxic—clean spills promptly and thoroughly.",
        image:
            "https://i.ibb.co/ch7wSMwQ/images-q-tbn-ANd9-Gc-QIha-UWHA0ceblgb-SBRTTh-Vd7c6-PZo-NBJEQRA-s.jpg",
    },
    {
        title: "Adjust food for energy needs",
        description:
            "Active outdoor dogs may need a small increase in calories in very cold weather; indoor pets typically maintain normal intake. Consult your vet for exact adjustments.",
        image:
            "https://i.ibb.co/zVLnJmCK/Open-Farm-Blog-Post-Photo-Feeding-Your-Active-Pet.jpg",
    },
    {
        title: "Provide warm, dry bedding",
        description:
            "Give pets an elevated, insulated, and draft-free sleeping area away from windows and cold floors. Use washable blankets or pet-safe heated pads if needed.",
        image:
            "https://i.ibb.co/fYPwy4wK/images-q-tbn-ANd9-Gc-Qc96-Il9229-Gpp-FB5-NSICVTl-VMLp-NLm-Ob-Wxp-A-s.jpg",
    },
];

export default function CareTipsPage() {
    return (
        <div className="bg-amber-50 pt-24">
            <MyContainer>
                <div className="text-center mx-3">
                    <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl pt-10 text-primary">
                        Winter Care Tips for Pets
                    </h2>
                    <p className="text-slate-500 py-5">
                        Keep your furry friends warm, safe, and happy all season long with
                        these essential winter care tips.
                    </p>
                </div>

                {/* GRID Layout instead of Marquee */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
                    {careTips.map((data, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg 
                                       transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                        >
                            <Image
                                src={data.image}
                                alt={data.title}
                                width={800}
                                height={600}
                                quality={75}
                                className="object-cover w-full h-48"
                            />

                            <div className="p-4 space-y-2">
                                <h5 className="text-lg md:text-xl font-bold text-gray-900">
                                    {data.title}
                                </h5>

                                <p className="text-sm md:text-base text-gray-700 leading-snug">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </MyContainer>
        </div>
    );
}
