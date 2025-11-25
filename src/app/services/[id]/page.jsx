"use client"
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";

const ServiceDetail = ({ params }) => {
    const { _id } = params;
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/petService/${_id}`)
                const data = await response.json()
                setPets(data);
                setLoading(false)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [_id])
    // if (loading) return <Spinner />

    return (
        <div>
            This is details Page
        </div>
    );
};

export default ServiceDetail;