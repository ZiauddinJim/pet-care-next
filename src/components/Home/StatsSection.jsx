"use client"

import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import AOS from "aos";
import { TbUsersGroup } from "react-icons/tb";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlinePets } from "react-icons/md";
import { Award } from 'lucide-react';
import Aos from "aos";
import 'aos/dist/aos.css';
import MyContainer from "../MyContainer";



const statsData = [
    { id: 1, title: "Happy Clients", endNumber: 1200, icon: <TbUsersGroup size={60} /> },
    { id: 2, title: "Awards Won", endNumber: 25, icon: <GrUserExpert size={60} /> },
    { id: 3, title: "Professionals", endNumber: 80, icon: <MdOutlinePets size={60} /> },
    { id: 4, title: "Projects Done", endNumber: 560, icon: <Award size={60} /> },
];

const CountUp = ({ end }) => {
    const { number } = useSpring({
        from: { number: 0 },
        to: { number: end },
        config: { duration: 3000 },

    });

    return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
};

const StatsSection = () => {
    useEffect(() => {
        AOS.refresh();
        Aos.init({
            duration: 800,
            easing: 'ease-in-out'
        })
    }, []);

    return (
        <MyContainer>
            <div className="w-full h-full bg-cover bg-center relative my-20 py-30"
                style={{ backgroundImage: `url("/assets/petStats.png")`, }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {statsData.map((stat) => (
                        <div
                            key={stat.id}
                            data-aos="fade-up"
                            className=" rounded-2xl p-6 animate__animated animate__fadeInUp flex flex-col items-center"
                        >
                            <h2 className="text-4xl font-bold text-base-100 mb-2">
                                <CountUp end={stat.endNumber} />+</h2>
                            <p className="text-base-100 font-medium">{stat.title}</p>
                            <div className="text-[#ff5933] flex mt-5">{stat.icon}</div>
                        </div>
                    ))}
                </div>
            </div>
        </MyContainer>
    );
};

export default StatsSection;
