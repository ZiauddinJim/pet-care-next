// components/BookButton.jsx
"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import AuthContext from "./AuthContext";

const BookButton = ({
    serviceId,
    serviceName,
    providerName,
    onBookedText = "Service Booked!",
    message = "Thank you.",
}) => {
    const router = useRouter();
    const { user } = useContext(AuthContext) || {};

    const [email, setEmail] = useState("");
    const [consultationName, setConsultationName] = useState("");
    const [phone, setPhone] = useState("");
    const [preferredDate, setPreferredDate] = useState("");
    const [notes, setNotes] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.email) setEmail(user.email);
    }, [user]);

    const openModal = () => {
        if (!user) {
            Swal.fire({
                icon: "info",
                title: "Please sign in",
                text: "You need to be signed in to book a consultation.",
                confirmButtonText: "Sign in",
                showCancelButton: true,
            }).then((res) => {
                if (res.isConfirmed) router.push("/login");
            });
            return;
        }
        setIsOpen(true);
    };

    const closeModal = () => {
        if (!loading) setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailToSend = email || user?.email || "";
        if (!emailToSend || !consultationName) {
            Swal.fire({
                icon: "warning",
                title: "Missing fields",
                text: "Please provide your email and consultation name.",
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    serviceId,
                    serviceName,
                    providerName,
                    email: emailToSend,
                    consultationName,
                    phone,
                    preferredDate,
                    notes,
                    createdAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) {
                const errText = await res.text().catch(() => null);
                throw new Error(`Request failed: ${res.status}${errText ? ` - ${errText}` : ""}`);
            }

            setLoading(false);
            setConsultationName("");
            setPhone("");
            setPreferredDate("");
            setNotes("");
            setIsOpen(false);

            await Swal.fire({
                icon: "success",
                title: onBookedText,
                text: message,
                confirmButtonText: "OK",
            });

            router.push("/myBookConsultation");
        } catch (err) {
            console.error("Booking error:", err);
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Booking failed",
                text: err?.message || "Something went wrong while submitting your booking.",
            });
        }
    };

    return (
        <>
            <button onClick={openModal} className="btn btn-primary">
                Book Now
            </button>

            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className="modal-box relative max-w-lg">
                    <button
                        className="btn btn-sm btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                        aria-label="Close modal"
                        disabled={loading}
                    >
                        ✕
                    </button>

                    <h3 className="text-lg font-bold mb-2">Book Consultation</h3>
                    <p className="mb-2 text-sm opacity-80">
                        Service and provider below are sent with your booking.
                    </p>

                    {/* Service info (read-only) */}
                    <div className="space-y-3 mb-2">
                        <div>
                            <label className="label"><span className="label-text">Service</span></label>
                            <input type="text" value={serviceName || "-"} readOnly className="input input-bordered w-full bg-gray-100" />
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Provider</span></label>
                            <input type="text"
                                value={providerName || "-"}
                                readOnly className="input input-bordered w-full bg-gray-100" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="label"><span className="label-text">Email</span></label>
                            <input
                                type="email"
                                value={email}
                                readOnly
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Advisee Name *</span></label>
                            <input
                                type="text"
                                value={consultationName}
                                onChange={(e) => setConsultationName(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="e.g., General checkup"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="label"><span className="label-text">Phone *</span></label>
                                <input type="tel" value={phone} required onChange={(e) => setPhone(e.target.value)} className="input input-bordered w-full" disabled={loading} />
                            </div>

                            <div>
                                <label className="label"><span className="label-text">Preferred Date *</span></label>
                                {/* <input type="date" value={preferredDate} required onChange={(e) => setPreferredDate(e.target.value)} className="input input-bordered w-full" disabled={loading} /> */}

                                <input
                                    type="date"
                                    value={preferredDate}
                                    min={new Date().toISOString().split("T")[0]}  // prevents past dates
                                    onChange={(e) => setPreferredDate(e.target.value)}
                                    className="input input-bordered w-full"
                                    disabled={loading} />
                            </div>
                        </div>

                        <div>
                            <label className="label"><span className="label-text">Notes / Message</span></label>
                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="textarea textarea-bordered w-full" rows={3} disabled={loading} />
                        </div>

                        <div className="modal-action justify-between">
                            <button type="button" className="btn btn-ghost" onClick={closeModal} disabled={loading}>Cancel</button>
                            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`} disabled={loading}>
                                {loading ? "Submitting..." : "Submit Booking"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookButton;
