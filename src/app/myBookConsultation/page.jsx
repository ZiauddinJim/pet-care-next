// components/MyBookConsultation.jsx
"use client";

import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import AuthContext from "@/components/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const MyBookConsultation = ({ email: emailProp }) => {
    const { user } = useContext(AuthContext) || {};
    const userEmail = emailProp || user?.email || "";
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [deleting, setDeleting] = useState(null);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!userEmail) return;
        let isMounted = true;

        const fetchBookings = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${baseUrl}/bookings?email=${encodeURIComponent(userEmail)}`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    const txt = await res.text().catch(() => null);
                    throw new Error(`Failed to fetch bookings (${res.status})${txt ? `: ${txt}` : ""}`);
                }
                const data = await res.json();
                if (isMounted) setBookings(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching bookings:", err);
                Swal.fire({ icon: "error", title: "Could not load bookings", text: err.message || "" });
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchBookings();
        return () => { isMounted = false; };
    }, [userEmail, baseUrl]);

    const handleDelete = async (_id) => {
        const confirm = await Swal.fire({
            title: "Delete booking?",
            text: "This will permanently remove the booking.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        });
        if (!confirm.isConfirmed) return;

        try {
            setDeleting(_id);
            const res = await fetch(`${baseUrl}/bookings/${_id}`, { method: "DELETE" });
            if (!res.ok) {
                const txt = await res.text().catch(() => null);
                throw new Error(`Delete failed (${res.status})${txt ? `: ${txt}` : ""}`);
            }
            const result = await res.json();
            const deleted = (result && (result.deletedCount === 1 || result.acknowledged === true)) || res.ok;
            if (deleted) {
                setBookings((prev) => prev.filter((b) => String(b._id) !== String(_id)));
                Swal.fire({ icon: "success", title: "Deleted", text: "Your booking has been deleted." });
            } else {
                throw new Error("Booking not deleted on server.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            Swal.fire({ icon: "error", title: "Delete failed", text: err.message || "" });
        } finally {
            setDeleting(null);
        }
    };

    return (
        <ProtectedRoute>
            <div className="max-w-5xl mx-auto p-6 shadow rounded my-8">
                <h2 className="text-xl font-semibold mb-3">My Book Consultations</h2>
                <div className="mb-4 text-sm text-muted">Showing bookings for <strong>{userEmail}</strong></div>

                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : bookings.length === 0 ? (
                    <div className="text-center py-8">You have no bookings yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Service</th>
                                    <th>Provider</th>
                                    <th>Name</th>
                                    <th>Preferred Date</th>
                                    <th>Phone</th>
                                    <th>Description</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b, i) => (
                                    <tr key={b._id || b.insertedId || JSON.stringify(b)}>
                                        <td>{i + 1}</td>
                                        <td>{b.serviceName || "-"}</td>
                                        <td>{b.providerName || "-"}</td>
                                        <td>{b.consultationName || "-"}</td>
                                        <td>{b.preferredDate ? new Date(b.preferredDate).toLocaleDateString() : "-"}</td>
                                        <td>{b.phone || "-"}</td>
                                        <td className="max-w-xs text-sm"><div className="truncate" title={b.notes || ""}>{b.notes || "-"}</div></td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className={`btn btn-ghost btn-sm ${deleting === b._id ? "loading" : ""}`}
                                                    onClick={() => handleDelete(b._id)}
                                                    disabled={!!deleting}
                                                    title="Delete booking"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
};

export default MyBookConsultation;
