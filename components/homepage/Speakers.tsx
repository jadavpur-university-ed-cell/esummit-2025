import { useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Speakers() {
    const speakersRef = useRef(null);

    gsap.fromTo(speakersRef.current,
        { opacity: 0, scale: 0.8 },
        {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: speakersRef.current,
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
            },
        }
    );

    return (
        <section className="min-h-screen flex items-center justify-center">
            <div ref={speakersRef} className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 max-w-5xl mx-4 text-white">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Speakers
                </h2>
            </div>
        </section>
    )
}