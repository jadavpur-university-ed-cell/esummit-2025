'use client';
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAllMerchOrders } from "@/lib/services/admin";
import { MerchOrder } from "@/types/admin";
import Link from "next/link";

function Page() {
  const router = useRouter();
  const [orders, setOrders] = useState<MerchOrder[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredOrders = orders.filter(
    (order) =>
      order.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.amount?.toString().toLowerCase().includes(search.toLowerCase()) ||
      order.status?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
      async function fetchOrders() {
        try {
          const data = await getAllMerchOrders();
          setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchOrders();
    }, []);

  return (
    <div className="bg-indigo min-h-screen border-b border-b-white/50 pt-28 pb-10 flex flex-col items-center">
      <div className="flex items-center justify-between mb-6 w-4/5">
      <button
        onClick={() => {
            signOut({ redirect: false });
            router.push("/");
        }}
        className="p-3 rounded-lg bg-red-500 cursor-pointer"
        >
        Logout
      </button>
      <Link href={"/admin/registrations"} className="text-white text-lg underline underline-offset-2">Registrations</Link>
        <h1 className="text-3xl font-bold text-white">Merchandise Dashboard</h1>
        <input
          type="text"
          placeholder="Search by name, amount or status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 bg-white/60 p-3 rounded-t-lg border-2 font-bold">
          <p className="font-bold w-32">Name</p>
              <p className="w-70">OrderId</p>
              <p className="w-72">Email</p>
              <p className="w-28">Size</p>
              <p className="w-32">Amount</p>
              <p className="w-32">Phone</p>
              <p className="w-32">Status</p>
        </div>

        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center justify-between text-white shadow-md hover:shadow-lg transition w-full hover:bg-white/30 cursor-pointer"
          >
            {/* User info row */}
            <div className="flex flex-row flex-wrap gap-6 items-center">
              <p className="font-bold w-32">{order.name}</p>
              <p className="w-70">{order.orderId}</p>
              <p className="w-72">{order.email}</p>
              <p className="w-28">{order.size}</p>
              <p className="w-32">{order.amount}</p>
              <p className="w-32">{order.phone ?? "No Number"}</p>
              <p className="w-32">{order.status}</p>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && !loading && (
          <p className="text-white mt-4">No orders found.</p>
        )}

        {loading && <p className="text-white mt-4">Loading, please wait!</p>}
      </div>
    </div>
  );
}

export default Page;
