import { useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";

export default function Hero() {
    const aboutRef = useRef<HTMLDivElement>(null);
    gsap.fromTo(aboutRef.current,
        { opacity: 0, x: -100 },
        {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
            },
        }
    );

    return (
        <section className="min-h-screen flex items-center justify-center">
            <div ref={aboutRef} className="bg-white/10 backdrop-blur-sm flex flex-col border border-white/20 rounded-2xl h-full w-full p-8 md:p-12 max-w-4xl mx-4 text-white">
                <h2 className="text-4xl md:text-6xl justify-center font-bold mb-6 text-center bg-clip-text">
                    About Us
                </h2>
                <div className="flex">
                    <Image
                        src={"/home/ju.png"}
                        width={500}
                        height={500}
                        alt={"JU image"}
                        className="mr-10"
                    />
                    <div className="text-lg md:text-xl text-gray-300 mb-6">
                        Jadavpur University, established in 1955, has transcended its origins as a state university to emerge as the best in the East. Presently it is an internationally recognised premier academic institute of the country. Accredited as a "Five Star University" by India's National Assessment and Accreditation Council (NAAC).
                        <br /><br />
                        Jadavpur University's Faculty of Engineering and Technology (FET) consistently commands a place among the nation's elite. In 2024 it was ranked 9th in the University Rankings of India by the NIRF , and holds the distinction of being the 12th best among Engineering Colleges in India.
                    </div>
                </div>
            </div>
        </section>
    )
}