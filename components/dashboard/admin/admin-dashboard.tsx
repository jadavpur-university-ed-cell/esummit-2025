"use client";

import { useState } from "react";
import { mockMultipleUser } from "@/mock/mockMultipleUserData";

export default function AdminDashboard() {
    const [search, setSearch] = useState("");

    const filteredUsers = mockMultipleUser.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className="min-h-screen p-6 md:p-16"
            style={{
                backgroundImage: "url(/background.png)",
                backgroundSize: "auto 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
            }}
        >
            <div className="flex pt-10 items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <input
                    type="text"
                    placeholder="Search by name, email or role"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex gap-4 bg-white/20 p-3 rounded-t-lg border-2 font-bold">
                    <p className="font-bold w-32">name</p>
                    <p className="w-95">email</p>
                    <p className="w-32">role</p>
                    <p className="w-52">institution</p>
                    <p className="w-32">phone</p>
                    <p className="w-32">graduationYear</p>
                </div>
                {filteredUsers.map((user, index) => (
                    <div
                        key={index}
                        className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center justify-between text-white shadow-md hover:shadow-lg transition w-full hover:bg-white/30 cursor-pointer"
                    >
                        {/* User info row */}
                        <div className="flex flex-row flex-wrap gap-6 items-center">
                            <p className="font-bold w-32 ">{user.name}</p>
                            <p className="w-90 ">{user.email}</p>
                            <p className="w-32 ">{user.role}</p>
                            <p className="w-48 ">{user.institution}</p>
                            <p className="w-32 ">{user.phone}</p>
                            <p className="w-32 ">{user.graduationYear}</p>
                            {/* <p className="w-32">{user.gender}</p>
                                <p className="w-32">{user.foodPreference}</p>
                                <p className="w-32">{user.merchandise.size} Shirt</p>
                                <p className="w-32">{user.merchandise.status}</p> */}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                            <button className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition text-sm">
                                Edit
                            </button>
                            <button className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {filteredUsers.length === 0 && (
                    <p className="text-white mt-4">No users found.</p>
                )}
            </div>
        </div>
    );
}
