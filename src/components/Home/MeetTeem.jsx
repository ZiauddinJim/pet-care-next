"use client"
import React, { useState } from 'react';
import MyContainer from '../MyContainer';
import Image from 'next/image';
const meetTeam = [
    {
        "id": 1,
        "name": "Anley",
        "role": "Owner and Registered Veterinary Nurse",
        "description": "Hi, I'm Anley - a Registered Veterinary Nurse with a strong passion for both pets and people.",
        "image": "https://i.ibb.co.com/0jDMXzZ7/anley-nova-vets.webp"
    },
    {
        "id": 2,
        "name": "Kate",
        "role": "Owner and Veterinary Surgeon",
        "description": "Hi, I'm Kate - I've been working as a vet in and around the Newport area for about eight years now.",
        "image": "https://i.ibb.co.com/tpw2v5Kb/kate-nova-vets.webp"
    },
    {
        "id": 3,
        "name": "Sam",
        "role": "Owner and Veterinary Surgeon",
        "description": "Hi, I'm Sam - I graduated with a degree in Veterinary Medicine and Surgery from the University of Edinburgh.",
        "image": "https://i.ibb.co.com/1fvM8vhp/sam-nova-vets.webp"
    }
]

const MeetTeem = () => {
    const [hoveredId, setHoveredId] = useState(null);
    return (
        <div className=' bg-purple-50'>
            <MyContainer>
                <div className="w-full h-full bg-cover bg-center relative rounded-2xl"
                    style={{
                        backgroundImage: `url("/assets/meet.png")`,
                    }}>
                    <div className={`relative z-10 flex flex-col justify-center mx-3 md:mx-9 
                                     h-[300px] md:h-[400px] lg:h-[500px] text-primary space-y-5`}>
                        <h1 className='text-3xl md:text-5xl font-bold '>Meet our Team</h1>
                        <p className='text-slate-800 max-w-96 font-semibold bg-white/35 p-2 rounded'>Meet the friendly faces who are committed to providing exceptional care for your pets.</p>
                    </div>
                </div>
                <div className='py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between'>
                    {
                        meetTeam.map(doctor => {
                            return (
                                <div key={doctor.id} className={`card w-full ${hoveredId === doctor.id ? "animate__animated animate__pulse" : ""}`}
                                    onMouseEnter={() => setHoveredId(doctor.id)}
                                    onMouseLeave={() => setHoveredId(null)}>
                                    <figure className="px-10 pt-10 hover:animate__animated">
                                        <Image
                                            src={doctor.image}
                                            alt={doctor.name}
                                            width={300}
                                            height={300}
                                            className="rounded-xl"
                                        />

                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title text-2xl text-primary">{doctor.name}</h2>
                                        <p className='font-semibold'>{doctor.role}</p>
                                        <p>{doctor.description}</p>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </MyContainer>
        </div>
    );
};

export default MeetTeem;