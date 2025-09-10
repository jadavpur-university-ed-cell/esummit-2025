import { useRef } from "react";
import { gsap } from 'gsap';

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
            <div className="text-center space-y-6 px-4">
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    <img
                        src="/home/logo.svg"
                        alt="Hero Logo"
                        style={{
                            width: '65vw',
                            filter: 'drop-shadow(0 px 32px rgba(80, 0, 180, 0.45))',
                        }}
                    />
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-bold">
                    Jadavpur University Entrepreneurship Cell Presents the Fourth Edition of Our Flagship Event
                </p>
            </div>
        </section>
    )
}