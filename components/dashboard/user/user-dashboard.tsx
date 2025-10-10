import Image from "next/image";
import { LogOut } from "lucide-react";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserDashboardProps {
    userData?: User;
    profileImage?: string;
}

interface MerchandiseOrder {
    amount: number;
    size: string;
    status: string;
    createdAt: string;
    orderId: string;
}

export default function UserDashboard({
    userData = {} as User,
    profileImage = "/user.png"
}: UserDashboardProps) {
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        phone: userData.phone || "",
        college: userData.college || "",
        branch: userData.branch || "",
        shirtSize: userData.shirtSize || "",
        year: userData.year || "",
    });
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<MerchandiseOrder[]>([]);
    const [error, setError] = useState<string | null>(null);


    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/order-by-user");
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch orders");
                }

                setOrders(data.order || "");
                console.log("Data from user-dashboard is:", data.order);
            } catch (err: unknown) {
                console.error(err);
                if(err instanceof Error) setError(err.message);
                else setError("Unexpected Error Occurred.")
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/edit-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userData.email, ...form }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Something went wrong.");
                setLoading(false);
                return;
            } else {
                setEditing(false);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            style={{
                backgroundImage: 'url(/background.png)',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
            }}
            className="pb-10 min-h-screen text-[#AFB2F5]"
        >
            <main className="px-8 md:px-[6vw] pt-20 font-medium">
                {/* Header */}
                <header className="flex flex-wrap justify-between items-center py-8 gap-4 border-b border-white/10">
                    {/* <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all">
                        <Bell />
                        <span>Notifications</span>
                    </button> */}

                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-center md:flex-1">
                        My Dashboard
                    </h1>

                    <button
                        onClick={() => {
                            signOut({ redirect: false });
                            router.push("/");
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all text-red-500 cursor-pointer"
                    >
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </header>

                <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {/* Merchandise Section */}
                    <div className="order-2 md:order-1">
                        <section className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col items-center">
                            <h2 className="text-2xl font-semibold mb-3">My Merchandise</h2>
                            <div className="my-4 w-full max-w-xs flex justify-center">
                                <Image
                                    src="/merchandise/shirt_nobg.png"
                                    height={300}
                                    width={300}
                                    alt="Merchandise"
                                    className="w-40 md:w-48"
                                />
                            </div>
                            {
                                !userData.shirtSize && (
                                    <div className="text-red-600">
                                        Please complete your Profile first
                                    </div>
                                )
                            }
                            {!orders || orders.length === 0 ? (
                                <button
                                    className="bg-[#c085fd] text-[#101720] font-semibold py-2 px-6 rounded-full hover:bg-[#EAE2B7] transition-all mt-3 cursor-pointer"
                                    disabled={!userData.shirtSize}
                                    onClick={() => router.push('/merchandise')}
                                >
                                    Buy Merchandise
                                </button>
                            ) : (
                                <table className="w-full text-sm md:text-base mt-5 border-collapse rounded-lg overflow-hidden">
                                    <thead className="bg-[#c085fd]/20 text-left">
                                        <tr>
                                            <th className="p-3 font-medium">Order ID</th>
                                            <th className="p-3 font-medium">Status</th>
                                            <th className="p-3 font-medium">Size</th>
                                            <th className="p-3 font-medium">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, i) => (
                                            <tr key={i} className="border-t border-white/20 hover:bg-white/5 transition">
                                                <td className="p-3">{order?.orderId || 'N.A.'}</td>
                                                <td className="p-3">{order?.status || 'N.A.'}</td>
                                                <td className="p-3">{order?.size || 'N.A.'}</td>
                                                <td className="p-3">
                                                    {order?.amount ? `₹${order.amount}` : 'N.A.'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </section>
                    </div>

                    {/* Profile Section */}
                    <div className="order-1 md:order-2">
                        <section className="flex flex-col md:flex-row justify-between gap-8 p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                            <div className="flex flex-col gap-6 w-full md:w-2/3">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold">My Profile</h2>
                                    <button
                                        onClick={() => setEditing(!editing)}
                                        className="text-sm px-4 py-2 bg-black/70 text-white rounded-md hover:bg-black transition cursor-pointer"
                                    >
                                        {editing ? 'Cancel' : 'Edit'}
                                    </button>
                                </div>

                                {editing ? (
                                    <div className="flex flex-col gap-3">
                                        <input
                                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                            placeholder="Phone"
                                            value={form.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                        />
                                        <input
                                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                            placeholder="Institution"
                                            value={form.college}
                                            onChange={(e) => handleChange('college', e.target.value)}
                                        />
                                        <input
                                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                            placeholder="Branch"
                                            value={form.branch}
                                            onChange={(e) => handleChange('branch', e.target.value)}
                                        />
                                        <select
                                            className="border border-gray-300 bg-transparent p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                            value={form.shirtSize}
                                            onChange={(e) => handleChange('shirtSize', e.target.value)}
                                        >
                                            <option value="" className="text-black">Select Shirt Size</option>
                                            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                                                <option key={s} value={s} className="text-black">
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                            placeholder="Graduation Year"
                                            value={form.year}
                                            onChange={(e) => handleChange('year', e.target.value)}
                                        />
                                        <button
                                            onClick={handleSave}
                                            disabled={loading}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-2 cursor-pointer"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-base w-full">
                                        <div className="col-span-2 sm:col-span-3">
                                            <p className="text-gray-400 text-sm">Email</p>
                                            <p className="font-medium text-white break-all">{userData.email || 'N.A.'}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-sm">Role</p>
                                            <p className="font-medium text-white">{userData.role || 'N.A.'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Phone</p>
                                            <p className="font-medium text-white">{userData.phone || 'N.A.'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Institution</p>
                                            <p className="font-medium text-white">{userData.college || 'N.A.'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Branch</p>
                                            <p className="font-medium text-white">{userData.branch || 'N.A.'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Shirt Size</p>
                                            <p className="font-medium text-white">{userData.shirtSize || 'N.A.'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Graduation Year</p>
                                            <p className="font-medium text-white">{userData.year || 'N.A.'}</p>
                                        </div>
                                    </div>
                                )}
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>

                            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 self-center md:self-start">
                                <Image
                                    src={profileImage}
                                    alt="Profile"
                                    width={160}
                                    height={160}
                                    className="rounded-full object-cover w-full h-full border-4 border-white/30 shadow-md hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </section>
                    </div>
                </div>

                {/* Event Sections */}
                {/* {['Registered', 'Wishlisted', 'Pending'].map((type) => (
                    <section
                        key={type}
                        className="my-8 p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
                    >
                        <h2 className="text-2xl font-semibold mb-4">{type} Events</h2>
                        <p className="text-lg text-gray-300">
                            No events in this category, as of now.
                        </p>
                    </section>
                ))} */}
            </main>
        </section>

    )
}