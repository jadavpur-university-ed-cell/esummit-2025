"use client"
import Link from "next/link";
import React,{useEffect,useState} from "react";

function NavComponent({ name, location }: { name: string; location: string }) {
  return (
	<Link
	  className="
	  px-6
	  py-2
	  rounded-full
	  shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(255,255,255,0.5)]
	  text-white
	  font-medium
	  transition-colors
	  hover:bg-neutral-100/60
	  hover:shadow-lg
	  "
	  href={location}
	>{name}</Link>
  );
}

function Navbar() {
  const navigationItems = {
	"Home":"/",
	"About":"#about",
	"Events":"#events",
	"Contact":"#contact",
	"Login":"/login",
  }

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
	const handleScroll = () => {
	  const currentScrollY = window.scrollY;
	  const thresholdHeight = document.body.scrollHeight * 0.4;

	  if (currentScrollY < lastScrollY) {
		setShowNavbar(true);
	  } else if (currentScrollY > lastScrollY && currentScrollY > thresholdHeight) {
		setShowNavbar(false);
	  }
	  setLastScrollY(currentScrollY);
	};

	window.addEventListener('scroll', handleScroll);
	return () => window.removeEventListener('scroll', handleScroll);

  }, [lastScrollY]);

  return (
	<nav className={`
	  fixed top-0 left-0 w-full z-100 
	  transform transition-transform duration-300 ease-in-out
	  ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
	  `}>
		<div className="flex justify-center">
		  <div className="
		  flex justify-center 
		  gap-4 px-4 py-2 my-4 w-fit
		  rounded-full
		  backdrop-blur-[4px]
		  shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(255,255,255,0.5)]
		  ">
			{Object.entries(navigationItems).map(([key, value]) => (<NavComponent key={key} name={key} location={value}></NavComponent>))}
		  </div>
		</div>
	</nav>
  );
};


export default Navbar
