import { useRef } from "react";
import { gsap } from 'gsap';
import Image from "next/image";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    gsap.fromTo(heroRef.current,
        { opacity: 1, y: 0 },
        {
            opacity: 0,
            y: -100,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        }
    );

    return (
        <section
            ref={heroRef}
            className="min-h-screen flex items-center justify-center text-white"
        >
            <div className="text-center space-y-8 px-4">
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    <Image
                        src="/home/logo.svg"
                        alt="E-Summit Logo"
                        width={500}
                        height={500}
                        className="w-[65vw] drop-shadow-[(0 px 32px rgba(80, 0, 180, 0.45)]"
                    />
                </h1>
                <p className="text-xl md:text-2xl text-[#afb2f5] max-w-2xl mx-auto font-semibold">
                    Jadavpur University Entrepreneurship Cell Presents the Fifth Edition of Our Flagship Event
                </p>
            </div>
        </section>
    )
}