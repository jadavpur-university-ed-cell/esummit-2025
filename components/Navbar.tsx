"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import SideBar from "./SideBar";

function NavComponent({ name, location }: { name: string; location: string }) {
  return (
    <Link
      className="
				px-4 py-1.5
        sm:px-5 sm:py-2
        md:px-6 md:py-2.5
        lg:px-8 lg:py-3

        rounded-full
        shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(255,255,255,0.4)]
        md:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(255,255,255,0.5)]
        
        text-xs
        sm:text-sm
        md:text-base
        lg:text-lg
        font-medium
        text-white

        bg-neutral-800/40
        hover:bg-neutral-100/60
        transition-all
        duration-300
        hover:shadow-lg
	  "
      href={location}
    >
      {name}
    </Link>
  );
}

export type NavigationItems = {
  Home: string;
  About: string;
  Events: string;
  Contact: string;
  Dashboard?: string;
  Login?: string;
};

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();

  const navigationItems: NavigationItems = session.data
    ? {
        Home: "/",
        About: "/#about",
        Events: "/#events",
        Contact: "/#contact",
        Dashboard: "/dashboard",
      }
    : {
        Home: "/",
        About: "/#about",
        Events: "/#events",
        Contact: "#contact",
        Login: "/sign-in",
      };

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const thresholdHeight = document.body.scrollHeight * 0.4;

      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else if (
        currentScrollY > lastScrollY &&
        currentScrollY > thresholdHeight
      ) {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isEventsPage = pathname.startsWith("/events/*");

  if (isEventsPage) {
    return <SideBar navigationItems={navigationItems} />;
  }

  return (
    <div>
      <SideBar navigationItems={navigationItems} />
      <nav
        className={`
          hidden md:block
          fixed top-0 left-0 w-full z-100 px-2
          transform transition-transform duration-300 ease-in-out
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex justify-center">
          <div
            className="
              flex justify-center items-center
              w-full md:w-fit
              gap-2 sm:gap-3 md:gap-4
              px-3 py-1 sm:px-4 sm:py-2.5 md:px-6 md:py-2
              my-3 sm:my-4
              rounded-full
              backdrop-blur-[4px]
              bg-white/10 dark:bg-black/20
              shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(255,255,255,0.5)]
              hover:shadow-lg transition-all duration-300
            "
          >
            {Object.entries(navigationItems).map(([key, value]) => (
              <NavComponent key={key} name={key} location={value} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;