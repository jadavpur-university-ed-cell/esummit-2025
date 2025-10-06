"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function CompleteProfile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        phone: "",
        college: "",
        year: "",
        branch: "",
        rollNo: "",
        shirtSize: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Redirect if not logged in    
    useEffect(() => {
        console.log("Session is: ", session);
        console.log("Status is: ", status);
        if (status === "unauthenticated") router.push("/sign-in");
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") return (
        <div className="min-h-screen">
            Checking authentication...
        </div>
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.email) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/complete-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: session.user.email, ...form }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong.");
                setLoading(false);
                return;
            }

            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden" style={{
            backgroundImage: 'url(/background.png)', backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
        }} >
            {/* Overlay to darken background slightly */}
            {/* <div className="absolute inset-0 bg-black/40"></div> */}

            <div className="relative z-10 w-full max-w-lg mx-4 p-8 my-20 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl text-center text-white">
                <Image
                    src="/home/logo.svg"
                    alt="E-Summit Logo"
                    width={150}
                    height={150}
                    className="mx-auto mb-6 drop-shadow-[0_16px_24px_rgba(80,0,180,0.45)]"
                />

                <h2 className="text-3xl font-extrabold mb-2 text-white">Complete Your Profile</h2>
                <p className="text-gray-300 mb-8">Help us get to know you better!</p>

                {error && <p className="text-red-400 mb-4 font-medium">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/** Inputs **/}
                    {['phone', 'college', 'year', 'branch', 'rollNo'].map((field) => (
                        <input
                            key={field}
                            name={field}
                            value={form[field as keyof typeof form]}
                            onChange={handleChange}
                            placeholder={field === 'year' ? 'Year of Graduation' : field.charAt(0).toUpperCase() + field.slice(1)}
                            required={field !== 'rollNo'}
                            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 backdrop-blur-sm transition"
                        />
                    ))}

                    <select
                        name="shirtSize"
                        value={form.shirtSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 backdrop-blur-sm transition appearance-none"
                    >
                        <option value="" className="text-black bg-white">Shirt Size</option>
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <option key={size} value={size} className="text-black bg-white">
                                {size}
                            </option>
                        ))}
                    </select>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-[#1b1c3d] text-white font-bold text-lg hover:scale-105 active:scale-95 transition transform shadow-lg cursor-pointer disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save & Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
}
