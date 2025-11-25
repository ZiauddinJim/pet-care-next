"use client"

import React, { useEffect, useState } from 'react';
import OCSCard from '@/components/OCSCard';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import MyContainer from '@/components/MyContainer';

const Services = () => {
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
        <div className='bg-red-50 py-10'>
            <title>Services | Pet Care</title>
            <MyContainer>
                <h1 className='font-bold text-4xl text-center'>Service List</h1>
                <ul className="flex justify-center gap-2 mt-4 font-semibold">
                    <li><Link href={"/"} className='text-secondary hover:underline'>Home</Link></li>
                    <li className=''>| Service</li>
                </ul>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 mx-3 md:mx-auto'>
                    {
                        pets.map(pet => <OCSCard pet={pet} key={pet._id} />)
                    }
                </div>
            </MyContainer>
        </div >
    );
};

export default Services;