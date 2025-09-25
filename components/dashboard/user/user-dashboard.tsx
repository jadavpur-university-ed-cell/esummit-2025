import Image from "next/image";
import { LogOut, Bell } from "lucide-react";
import { Event, User } from "@/types/all";

interface UserDashboardProps {
    eventData?: Event[];
    userData?: User;
}

export default function UserDashboard({
    eventData = [],
    userData = {} as User
}: UserDashboardProps) {
    return (
        <section
            style={{
                backgroundImage: 'url(/background.png)',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left',
            }}
            className="pb-5"
        >
            <main className="px-6 xms:px-16 md:px-[6vw] pt-20 text-[#afb2f5] font-semibold">
                <header className="flex gap-4 justify-around py-6 md:py-8">
                    <button className="cursor-pointer flex flex-row p-3 rounded-lg transition-all hover:bg-background/20 hover:-translate-y-0.5 font-semibold">
                        <Bell />
                        <div className="pl-5">
                            Notifications
                        </div>
                    </button>
                    <p className="text-4xl grid place-items-center">My Dashboard</p>
                    <button className="cursor-pointer flex flex-row p-3 rounded-lg transition-all hover:bg-background/20 hover:-translate-y-0.5 text-red-500 font-semibold">
                        <LogOut />
                        <div className="pl-5">
                            Logout
                        </div>
                    </button>
                </header>

                <p className="flex gap-4 py-6 md:py-8 text-2xl md:hidden">
                    Hello, {userData.name}!
                </p>

                <div className="pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 xms:gap-x-16 md:gap-x-[6vw] md:gap-y-8">

                    <div className="order-2 md:order-1">
                        <p className="md:flex py-4 text-2xl hidden">Hello, {userData.name}!</p>
                        <div className="rounded-md ">
                            <section className="flex flex-col items-center gap-6 p-6 rounded-md h-full w-full backdrop-blur-md bg-white/20">
                                <p className="py-2 text-xl">My Merchandise</p>
                                <div className="w-full max-w-3xs rounded-xl h-40  flex items-center justify-center">
                                    <Image
                                        src={userData.merchandise.src}
                                        height={150}
                                        width={150}
                                        alt={"Merchandise Image"}
                                    />
                                </div>
                                <p className="flex text-lg">Status: {userData.merchandise.status}</p>
                            </section>
                        </div>
                    </div>

                    <div className="rounded-md p-px order-1 md:order-2">
                        <section className="flex flex-col items-center gap-6 p-6 rounded-md h-full w-full backdrop-blur-lg bg-white/20 text-xl">
                            <div className="flex justify-center items-center w-full">
                                <p className="font-bold">My Profile</p>
                                <button className="cursor-pointer py-2 px-3 ml-2 hover:bg-background/20 rounded-md transition-all hover:shadow-md">
                                    Edit Icon
                                </button>
                            </div>
                            <div className="flex flex-row">
                                <div className="flex flex-col items-start space-y-1 font-medium">
                                    <p>Name: {userData.name || "user"}</p>
                                    <p>Email: {userData.email || "N.A."}</p>
                                    <p>Role: {userData.role || "N.A."}</p>
                                    <p>Phone No: {userData.phone || "N.A."}</p>
                                    <p>Institution: {userData.institution || "N.A."}</p>
                                    <p>Shirt Size: {userData.merchandise.size || "N.A."}</p>
                                    <p>Food Preference: {userData.foodPreference || "N.A."}</p>
                                    <p>Gender: {userData.gender || "N.A."}</p>
                                    <p>Graduation Year: {userData.graduationYear || "N.A."}</p>
                                </div>
                                <div className="relative w-32 h-32">
                                    {/* <div className="absolute inset-0 rounded-fullp-[3px]"> */}
                                    {/* <div className="w-full h-full rounded-full bg-black flex items-center justify-center"> */}
                                    <Image
                                        src="/user.png"
                                        alt="Profile"
                                        width={128}
                                        height={128}
                                        className="rounded-full object-cover w-28 h-28 hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* </div> */}
                                    {/* </div> */}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Registered Events */}
                <div className="col-span-full rounded-md p-px order-3">
                    <section className="flex flex-col gap-6 rounded-md h-full w-full my-3 backdrop-blur-lg bg-white/20 py-6 px-[6vw]">
                        <p className="text-2xl flex">Registered Events</p>
                        {userData.registeredEvents.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {userData.registeredEvents.map((eventSlug) => {
                                    const event = eventData.find((e) => e.eventSlug === eventSlug);
                                    if (!event) return null;
                                    return (
                                        <div key={eventSlug} className="rounded-lg bg-zinc-900/50 p-4 hover:shadow-md transition">
                                            <p className="text-xl font-semibold">{event.eventName}</p>
                                            <p className="text-sm text-gray-300">{event.description}</p>
                                            <p className="text-sm text-gray-400 mt-1">{event.about}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="flex text-lg">No events have been registered, as of now!</p>
                        )}
                    </section>
                </div>

                {/* Wishlisted Events */}
                <div className="col-span-full rounded-md p-px order-4">
                    <section className="flex flex-col gap-6 rounded-md h-full w-full my-3 backdrop-blur-lg bg-white/20 py-6 px-[6vw]">
                        <p className="text-2xl flex">Wishlisted Events</p>
                        {userData.wishlist.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {userData.wishlist.map((eventSlug) => {
                                    const event = eventData.find((e) => e.eventSlug === eventSlug);
                                    if (!event) return null;
                                    return (
                                        <div key={eventSlug} className="rounded-lg bg-zinc-900/50 p-4 hover:shadow-md transition">
                                            <p className="text-xl font-semibold">{event.eventName}</p>
                                            <p className="text-sm text-gray-300">{event.description}</p>
                                            <p className="text-sm text-gray-400 mt-1">{event.about}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="flex text-lg">No events are in your wishlist, as of now!</p>
                        )}
                    </section>
                </div>

                {/* Pending Events */}
                <div className="col-span-full rounded-md p-px order-5">
                    <section className="flex flex-col gap-6 rounded-md h-full w-full my-3 backdrop-blur-lg bg-white/20 py-6 px-[6vw]">
                        <p className="text-2xl flex">Pending Events</p>
                        {userData.pendingEvents.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {userData.pendingEvents.map((eventSlug) => {
                                    const event = eventData.find((e) => e.eventSlug === eventSlug);
                                    if (!event) return null;
                                    return (
                                        <div key={eventSlug} className="rounded-lg bg-zinc-900/50 p-4 hover:shadow-md transition">
                                            <p className="text-xl font-semibold">{event.eventName}</p>
                                            <p className="text-sm text-gray-300">{event.description}</p>
                                            <p className="text-sm text-gray-400 mt-1">{event.about}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="flex text-lg">No events are pending, as of now!</p>
                        )}
                    </section>
                </div>
            </main>
        </section>
    )
}