"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { NavigationItems } from "./Navbar";

function NavComponent({ name, location, onClick }: { name: string; location: string; onClick?: () => void }) {
  return (
    <Link
      href={location}
      onClick={onClick}
      className="
block px-6 py-3
    font-medium text-black
    rounded-2xl
    bg-white/20
    backdrop-blur-md
    border border-white/30
    shadow-lg
    transition-all duration-300
    hover:bg-white/30 hover:shadow-xl hover:scale-[1.02]
      "
    >
      {name}
    </Link>
  );
}

function SideBar({navigationItems}:{navigationItems:NavigationItems}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger toggle for small screens */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="
          fixed top-4 left-4 z-50
          w-10 h-10 flex flex-col justify-center items-center
          text-white rounded-md
					bg-white/10 dark:bg-black/20
          focus:outline-none
        "
        aria-label="Toggle sidebar"
      >
        <span className={`block h-1 w-6 bg-white rounded-sm transition-transform ${sidebarOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
        <span className={`block h-1 w-6 bg-white rounded-sm my-1 transition-opacity ${sidebarOpen ? "opacity-0" : "opacity-100"}`}></span>
        <span className={`block h-1 w-6 bg-white rounded-sm transition-transform ${sidebarOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
      </button>

      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-64 
				backdrop-blur-[4px]
				bg-white/10 dark:bg-black/20
          p-6 flex flex-col gap-4 z-40
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
				<Image src="/esummit-25.svg" alt="logo" width={200} height={200} className="pt-10"/>
        {Object.entries(navigationItems).map(([key, value]) => (
          <NavComponent key={key} name={key} location={value} onClick={() => setSidebarOpen(false)} />
        ))}
      </nav>

      {/* Overlay for small screens when sidebar is open */}
    </div>
  );
}

export default SideBar;
