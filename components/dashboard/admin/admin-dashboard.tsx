"use client";

import { useState, useEffect } from "react";
import { User } from '@/types/all';

export default function AdminDashboard() {
    const [users, setUsers] = useState<User []>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch users from the server API
    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    // Filter users based on search input
    const filteredUsers = users.filter(
        (user) =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.role?.toLowerCase().includes(search.toLowerCase())
    );

    // if (loading) return <p className="text-white mt-4">Loading users...</p>;

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
                <div className="flex gap-4 bg-white/60 p-3 rounded-t-lg border-2 font-bold">
                    <p className="font-bold w-32">name</p>
                    <p className="w-75">email</p>
                    <p className="w-52">role</p>
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
                            <p className="font-bold w-32">{user.name}</p>
                            <p className="w-70">{user.email}</p>
                            <p className="w-52">{user.role}</p>
                            <p className="w-48">{user.college}</p>
                            <p className="w-32">{user.phone}</p>
                            <p className="w-32">{user.year}</p>
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

                {(filteredUsers.length === 0 && !loading) && (
                    <p className="text-white mt-4">No users found.</p>
                )}

                {
                    loading && (
                        <p className="text-white mt-4">Loading, please wait!</p>
                    )
                }
            </div>
        </div>
    );
}
