"use client";

import React, { useEffect, useState } from "react";

import { MdOutlinePets } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import MyContainer from "../MyContainer";
import OCSCard from "../OCSCard";
import Spinner from "../Spinner";

const OurCareServices = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/petService`)
                const data = await response.json()
                setPets(data);
                setLoading(false)
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    if (loading) return <Spinner />


    return (
        <div className='bg-pink-50'>
            <MyContainer className={'py-10'}>
                <h1 className='text-2xl md:text-4xl font-bold text-center text-primary 
            md:w-7/12 md:mx-auto mx-3 animate__animated animate__pulse '>Your pet deserves care as unique as they are —
                    explore our full range of
                    veterinary <MdOutlinePets className='inline text-secondary rotate-20' size={40} /> services.
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10 mx-3 md:mx-auto'>
                    {
                        pets.slice(0, 4).map(pet => <OCSCard pet={pet} key={pet._id} />)
                    }
                </div>
                <div className='flex justify-center'>
                    <Link href={"/services"} className='btn btn-primary btn-dash   font-medium px-5'>All Services <FaArrowRight /></Link>
                </div>
            </MyContainer>
        </div>
    );
};

export default OurCareServices;
