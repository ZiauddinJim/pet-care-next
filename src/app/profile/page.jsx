"use client";

import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit, FaRegUser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";
import Image from "next/image";
import MyContainer from "@/components/MyContainer";
import AuthContext from "@/components/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const Profile = () => {
    const { user, updateProfileFun, setLoading, setUser } = useContext(AuthContext);

    // guard for cases user may be undefined while loading
    const safeDisplayName = user?.displayName ?? "";
    const safePhotoURL = user?.photoURL ?? "";
    const safeEmail = user?.email ?? "";

    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        displayName: safeDisplayName,
        photoURL: safePhotoURL,
    });
    const [originalData, setOriginalData] = useState(formData); // store original before editing

    // keep formData in sync if user object updates from context (e.g. after auth loads)
    useEffect(() => {
        setFormData({
            displayName: safeDisplayName,
            photoURL: safePhotoURL,
        });
        setOriginalData({
            displayName: safeDisplayName,
            photoURL: safePhotoURL,
        });
    }, [safeDisplayName, safePhotoURL]);

    // Change data (no preventDefault on input change)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Start editing
    const handleEditClick = () => {
        setIsEdit(true);
        setOriginalData(formData); // snapshot current data so Cancel can restore it
    };

    // Cancel editing — restore form data and exit edit mode
    const handleCancelClick = () => {
        setFormData(originalData);
        setIsEdit(false);
    };

    // Save changes
    const handleSaveClick = async (e) => {
        e.preventDefault();
        try {
            setLoading?.(true);
            await updateProfileFun(formData.displayName, formData.photoURL);

            // Merge updated fields into user correctly (don't nest formData)
            setUser?.((prevUser) => ({
                ...(prevUser || {}),
                displayName: formData.displayName,
                photoURL: formData.photoURL,
            }));

            Swal.fire({
                icon: "success",
                title: "Profile Updated",
                text: "Your profile has been updated successfully!",
                timer: 2000,
                showConfirmButton: false,
            });

            setIsEdit(false);
            setOriginalData(formData);
        } catch (err) {
            console.error("Profile update error:", err);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong. Please try again.",
            });
        } finally {
            setLoading?.(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen mt-27">
                <title>Profile | Pet Care</title>
                <MyContainer>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row gap-3 md:gap-5 justify-between items-center my-8 mx-3 md:mx-auto text-center md:text-left">
                        <div>
                            <h1 className="font-bold text-2xl md:text-3xl mb-1 text-[#003453]">My Profile</h1>
                            <p className="text-gray-600 text-sm md:text-base">Manage your account information</p>
                        </div>
                        {!isEdit ? (
                            <button onClick={handleEditClick} className="btn btn-primary flex items-center gap-2 px-4 py-2 text-sm md:text-base">
                                <CiEdit size={20} />
                                Update Profile
                            </button>
                        ) : (
                            <button onClick={handleCancelClick} className="btn btn-primary flex items-center gap-2 px-4 py-2 text-sm md:text-base">
                                <IoClose /> Cancel
                            </button>
                        )}
                    </div>

                    {/* Main Section */}
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-6 md:gap-10 mb-10 mx-3 md:mx-auto place-content-center">
                        {/* Profile Picture */}
                        <div className="relative mx-auto col-span-1 md:col-span-2 bg-white shadow-lg p-6 text-center flex flex-col rounded-2xl w-full max-w-sm">
                            {!isEdit ? (
                                <button onClick={handleEditClick} className="absolute top-2 right-2 btn btn-ghost btn-sm p-1">
                                    <FaRegEdit size={20} />
                                </button>
                            ) : (
                                <button onClick={handleCancelClick} className="absolute top-2 right-2 btn btn-ghost btn-sm p-1">
                                    <IoClose size={20} />
                                </button>
                            )}

                            {/* Use a normal <img> so external photoURL works without next.config changes.
                If you prefer next/image, import and use it and configure allowedDomains. */}
                            <Image
                                src={formData.photoURL || "/assets/user.png"}
                                alt="Profile"
                                width={112}
                                height={112}
                                className="w-28 h-28 md:w-32 md:h-32 bg-gray-100 rounded-full border-4 p-1 border-[#003453] mx-auto object-cover"
                            />

                            <h3 className="font-bold text-xl mt-4 mb-2 truncate">{formData.displayName || safeDisplayName}</h3>
                            <p className="text-gray-600 text-sm md:text-base">{safeEmail}</p>

                            <div className="mt-3 inline-block bg-green-100 text-green-800 text-sm md:text-base rounded-full py-1 px-4 font-medium">
                                User
                            </div>
                        </div>

                        {/* Profile Details and Update */}
                        <div className="col-span-1 md:col-span-6 bg-white shadow-lg p-6 flex flex-col rounded-2xl">
                            <h3 className="flex gap-2 text-xl md:text-2xl font-semibold items-center text-slate-700 mb-6">
                                <FaRegUser /> Personal Information
                            </h3>

                            <form className="grid grid-cols-1 sm:grid-cols-2 gap-8" onSubmit={handleSaveClick}>
                                {/* Name */}
                                <div>
                                    <p className="text-gray-500 text-sm md:text-base">Full Name</p>
                                    {isEdit ? (
                                        <input
                                            type="text"
                                            name="displayName"
                                            placeholder="Your Name"
                                            value={formData.displayName}
                                            onChange={handleChange}
                                            className="border placeholder-gray-500 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#fa9984]"
                                        />
                                    ) : (
                                        <p className="text-lg md:text-xl font-medium">{safeDisplayName}</p>
                                    )}
                                </div>

                                {/* Email (readonly) */}
                                <div>
                                    <p className="text-gray-500 text-sm md:text-base">Email</p>
                                    <p className="text-lg md:text-xl font-medium">{safeEmail}</p>
                                    <p className="text-sm text-gray-500">Email cannot be changed</p>
                                </div>

                                {/* Photo URL when editing */}
                                {isEdit && (
                                    <div>
                                        <p className="text-gray-500 text-sm md:text-base">Photo URL</p>
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                name="photoURL"
                                                placeholder="Edit your photo URL"
                                                value={formData.photoURL}
                                                onChange={handleChange}
                                                className="border placeholder-gray-500 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#fa9984]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Save button */}
                                {isEdit && (
                                    <div className="sm:col-span-2">
                                        <button type="submit" className="btn btn-primary flex items-center gap-2 px-4 py-2 text-sm md:text-base w-fit mt-5">
                                            <AiOutlineSave /> Save
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </MyContainer>
            </div>
        </ProtectedRoute>
    );
};

export default Profile;
