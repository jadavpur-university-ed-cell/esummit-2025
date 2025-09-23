import { auth } from "@/auth"
import type { Metadata } from "next"
import Image from "next/image";
import { LogOut, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | JU E-Summit'25",
};

enum Role {
  participant = "Participant",
  admin = "Admin",
  superadmin = "Super-Admin",
}

export default async function DashboardPage() {
  const session = await auth();
  console.log("session is:", session)
  const mockEventData = [
    {
      _id: "evt1",
      name: "Mockstock",
      slug: "mockstock",
      description: "Simulate the stock market in a thrilling trading competition.",
      category: "Finance",
      date: "2025-02-14",
    },
    {
      _id: "evt2",
      name: "HackNPitch",
      slug: "hacknpitch",
      description: "48-hour hackathon with pitching sessions for innovative ideas.",
      category: "Hackathon",
      date: "2025-02-15",
    },
    {
      _id: "evt3",
      name: "Dizmart",
      slug: "dizmart",
      description: "Marketing strategy competition where creativity meets business.",
      category: "Marketing",
      date: "2025-02-16",
    },
    {
      _id: "evt4",
      name: "Summit Cup",
      slug: "summit-cup",
      description: "E-Summit’s sports & gaming championship event.",
      category: "Sports",
      date: "2025-02-17",
    },
    {
      _id: "evt5",
      name: "Corporate Clash",
      slug: "corporate-clash",
      description: "Case study and strategy event where teams battle with ideas.",
      category: "Business",
      date: "2025-02-18",
    },
  ];

  const mockUserData = {
    name: "Sarin",
    email: "sarin@example.com",
    emailVerified: true,
    gender: "Male",
    graduationYear: "2028",
    phone: "9876543210",
    role: Role.participant,
    institution: "Jadavpur University",
    foodPreference: "Non-Vegetarian",
    merchandise: {
      src: "/merchandise/merch-in-dashboard.svg",
      status: "Ordered",
      color: "Black",
      size: "M",
    },
    registeredEvents: ["evt1", "evt3"],  // Mockstock + Dizmart
    wishlist: ["evt2", "evt5"],          // HackNPitch + Corporate Clash
    pendingEvents: ["evt4"],             // Summit Cup
  };
  if (!session) {
    return (
      <div
        className="min-h-screen flex items-center justify-center pb-5"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left',
        }}
      >
        <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl p-22 text-center text-white">
          <Image
            src="/home/logo.svg"
            alt="E-Summit Logo"
            width={500}
            height={500}
            className="drop-shadow-[0px_32px_32px_rgba(80,0,180,0.45)]"
          />
          <div className="mt-6 text-[#afb2f5] text-2xl font-semibold">
            Please sign in to view this page.
          </div>
        </div>
      </div>

    );
  }

  return (
    <section
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'auto 100%',   // width auto, height 100%
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
      }}
      className="pb-5"
    >
      {/* Navbar placeholder */}
      <main className="px-6 xms:px-16 md:px-[6vw] text-[#afb2f5] font-semibold">
        {/* Header */}
        <header className="flex gap-4 justify-around py-6 md:py-8">
          <button className="cursor-pointer flex flex-row p-3 rounded-lg transition-all hover:bg-background/20 hover:-translate-y-0.5 font-semibold">
            <Bell />
            <div className="pl-5">
              Notifications
            </div>
          </button>
          <p className="text-2xl grid place-items-center">My Dashboard</p>
          <button className="cursor-pointer flex flex-row p-3 rounded-lg transition-all hover:bg-background/20 hover:-translate-y-0.5 text-red-500 font-semibold">
            <LogOut />
            <div className="pl-5">
              Logout
            </div>
          </button>
        </header>

        {/* Mobile Greeting */}
        <p className="flex gap-4 py-6 md:py-8 text-2xl md:hidden">
          Hello, {mockUserData.name}!
        </p>

        {/* Two-column grid */}
        <div className="pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 xms:gap-x-16 md:gap-x-[6vw] md:gap-y-8">

          {/* Merchandise Section */}
          <div className="order-2 md:order-1">
            <p className="md:flex py-4 text-2xl hidden">Hello, {mockUserData.name}!</p>
            <div className="rounded-md ">
              <section className="flex flex-col items-center gap-6 p-6 rounded-md h-full w-full backdrop-blur-md bg-white/20">
                <p className="py-2 text-xl">My Merchandise</p>
                <div className="w-full max-w-3xs rounded-xl h-40  flex items-center justify-center">
                  <Image
                    src={mockUserData.merchandise.src}
                    height={150}
                    width={150}
                    alt={"Merchandise Image"}
                  />
                </div>
                <p className="flex text-lg">Status: {mockUserData.merchandise.status}</p>
              </section>
            </div>
          </div>

          {/* Profile Section */}
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
                  <p>Name: {mockUserData.name || "user"}</p>
                  <p>Email: {mockUserData.email || "N.A."}</p>
                  <p>Role: {mockUserData.role || "N.A."}</p>
                  <p>Phone No: {mockUserData.phone || "N.A."}</p>
                  <p>Institution: {mockUserData.institution || "N.A."}</p>
                  <p>Shirt Size: {mockUserData.merchandise.size || "N.A."}</p>
                  <p>Food Preference: {mockUserData.foodPreference || "N.A."}</p>
                  <p>Gender: {mockUserData.gender || "N.A."}</p>
                  <p>Graduation Year: {mockUserData.graduationYear || "N.A."}</p>
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
            {mockUserData.registeredEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {mockUserData.registeredEvents.map((eventId) => {
                  const event = mockEventData.find((e) => e._id === eventId);
                  return (
                    <div
                      key={eventId}
                      className="rounded-lg bg-zinc-900/50 p-4 hover:shadow-md transition"
                    >
                      <p className="text-xl font-semibold">{event?.name}</p>
                      <p className="text-sm text-gray-300">{event?.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {event?.category} • {event?.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="flex text-lg">No events have been registered, as of now!</p>
            )}
          </section>
        </div>

        {/* Wishlist Events */}
        <div className="col-span-full rounded-md p-px order-4">
          <section className="flex flex-col gap-6 rounded-md h-full w-full my-3 backdrop-blur-lg bg-white/20 py-6 px-[6vw]">
            <p className="text-2xl flex">Wishlisted Events</p>
            {mockUserData.wishlist.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {mockUserData.wishlist.map((eventId) => {
                  const event = mockEventData.find((e) => e._id === eventId);
                  return (
                    <div
                      key={eventId}
                      className="rounded-lg bg-zinc-900/50 p-4 hover:shadow-md transition"
                    >
                      <p className="text-xl font-semibold">{event?.name}</p>
                      <p className="text-sm text-gray-300">{event?.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {event?.category} • {event?.date}
                      </p>
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
            {mockUserData.pendingEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {mockUserData.pendingEvents.map((eventId) => {
                  const event = mockEventData.find((e) => e._id === eventId);
                  return (
                    <div
                      key={eventId}
                      className="rounded-lg bg-zinc-900/50 p-4 hover:shadow-md transition"
                    >
                      <p className="text-xl font-semibold">{event?.name}</p>
                      <p className="text-sm text-gray-300">{event?.description}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {event?.category} • {event?.date}
                      </p>
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
  );
}
