"use client"

import React, { useEffect, useState } from 'react';
import OCSCard from '@/components/OCSCard';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import MyContainer from '@/components/MyContainer';
import { IoIosSearch } from 'react-icons/io';

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
                {/* Sort & Search Section */}
                <div className="my-5 flex flex-col  justify-center sm:flex-row sm:justify-between items-center gap-3 sm:gap-5">
                    {/* Sort */}
                    <div className="w-full sm:w-auto flex justify-center">
                        <select  className="select select-bordered w-56">
                            <option disabled value="">Sort by Experience</option>
                            <option value="rating">Rating (5-1)</option>
                            <option value="experience-low">Experience (low - high)</option>
                            <option value="experience-high">Experience (high - low)</option>
                            <option value="name">Name (A-Z)</option>
                        </select>
                    </div>

                    {/* Search */}
                    <form className="join w-56 sm:w-auto flex justify-center">
                        <label className="input validator join-item grow w-fit sm:w-auto">
                            <input type="search" name="search" className="grow w-full" placeholder="Search" />
                        </label>
                        <button className="btn btn-primary join-item flex items-center justify-center">
                            <IoIosSearch size={24} />
                        </button>
                    </form>
                </div>
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
