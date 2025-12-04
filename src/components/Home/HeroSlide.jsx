// components/HeroSlide.jsx
"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import MyContainer from "../MyContainer";

const hero = [
    {
        id: 1,
        title: "Snug Winter Walks",
        subtitle: "Keep your dog warm and stylish",
        description:
            "Protect your furry friend from the chilly winter with cozy coats designed for comfort and warmth.",
        imageUrl:
            "https://i.ibb.co/DDdDcTc5/Adobe-Stock-314342216-scaled.jpg",
    },
    {
        id: 2,
        title: "Seasonal Comfort",
        subtitle: "Adapting to winter with care",
        description:
            "As the seasons change, ensure your pets stay cozy and happy with snug winter outfits.",
        imageUrl:
            "https://i.ibb.co/TqcM4Dvb/t8mly-Dugrg5-JHj-Hr00-N2-B0changing-seasons-and-your-pets-jpg.jpg",
    },
    {
        id: 3,
        title: "Fleece Fun",
        subtitle: "Stylish warmth for small dogs",
        description:
            "Small dogs can enjoy winter too! Keep them toasty in fleece bodysuits made for winter adventures.",
        imageUrl: "https://i.ibb.co/Z0R972w/1.png",
    },
];

const HeroSlide = () => {
    return (
        <MyContainer>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                style={{
                    "--swiper-navigation-color": "#ff5933",
                    "--swiper-pagination-color": "#ff5933",
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl"
            >
                {hero.map((slideData) => (
                    <SwiperSlide key={slideData.id}>
                        <div
                            className="hero-image w-full max-h-50% mt-20 bg-cover bg-center relative rounded-2xl"
                            style={{
                                backgroundImage: `url(${slideData.imageUrl})`,
                            }}
                        >
                            <div className="absolute inset-0 bg-black/50 rounded-2xl" />
                            <div className="relative z-10 flex flex-col justify-center mx-9 text-center h-[500px] md:h-[600px] lg:h-[700px] text-white space-y-5">
                                <h1 className="text-3xl md:text-5xl font-bold">
                                    {slideData.title}
                                </h1>
                                <p className="text-xl md:text-3xl font-semibold">
                                    {slideData.subtitle}
                                </p>
                                <p className="text-gray-300">{slideData.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </MyContainer>
    );
};

export default HeroSlide;
