
import BackButton from '@/components/BackButton';
import BookButton from '@/components/BookButton';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';

async function getService(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/petService/${id}`, {
        cache: "no-store",
    });
    return res.json();
}

const page = async ({ params }) => {
    const { id } = await params

    const pet = await getService(id)

    const { serviceId, serviceName, providerEmail,
        price, rating, slotsAvailable, description,
        image, category, providerName } = pet

    return (
            <div className='max-w-4xl mx-auto p-6 shadow-md rounded-md mb-10 mt-27'>
                <div className='flex flex-col md:flex-row gap-6'>
                    <Image src={image} alt={serviceName} width={600}
                        height={400} className="w-full md:w-1/2 rounded-md object-cover" />
                    <div className='flex-1 space-y-1.5'>
                        <BackButton />
                        <h1 className='font-bold text-2xl text-primary '>{serviceName}</h1>
                        <p>{description}</p>
                        <p><strong>Service ID:</strong> {serviceId}</p>
                        <p><strong>Provider Name:</strong> {providerName}</p>
                        <p><strong>Provider Contact:</strong> {providerEmail}</p>
                        <p><strong>Category:</strong> {category}</p>
                        <p><strong>Price:</strong> {price}</p>
                        <div className='flex'><strong>Rating:</strong> <div className='flex flex-row-reverse justify-end gap-2 items-center text-secondary'>
                            {Array.from({ length: rating }).map((_, i) => (
                                <FaStar key={i} />
                            ))} <span className='ml-2 text-white bg-primary px-2 rounded'>{rating}</span></div>
                        </div>
                        <p><strong>Slots Available:</strong> {slotsAvailable}</p>

                        <div className='mt-10 text-2xl font-semibold text-primary'>Book a Consultation:</div>
                       <BookButton
                            serviceId={serviceId}
                            serviceName={serviceName}
                            providerName={providerName}
                            message="Thank you."
                        />
                    </div>
                </div>
            </div>
    );
};

export default page;
