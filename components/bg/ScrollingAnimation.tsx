'use client'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxWebsite() {
  const containerRef = useRef(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen width
    if (window.innerWidth < 1024) return;
    const mobileCheck = window.innerWidth < 1024;
    setIsMobile(mobileCheck);

    const ctx = gsap.context(() => {
      // ✅ Background parallax only on desktop
      if (!mobileCheck) {
        gsap.to(backgroundRef.current, {
          x: "-50%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }

      // Hero section animation
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

      // About section reveal
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

      // Events section reveal
      gsap.fromTo(eventsRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: eventsRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Services section reveal
      gsap.fromTo(servicesRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Contact section reveal
      gsap.fromTo(contactRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 h-full overflow-hidden z-0">
        <div
          ref={backgroundRef}
          className="h-full"
          style={{
            backgroundImage: 'url(/background.png)',
            width: isMobile ? '100vw' : `${(11534 / 972) * 100}vh`, 
            height: '100vh',
            backgroundSize: isMobile ? 'cover' : 'contain', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
            transform: isMobile ? 'none' : undefined,
          }}
        />
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
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

        {/* About Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div ref={aboutRef} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-4 text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Us
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              We create immersive digital experiences that captivate and engage. Our team specializes in cutting-edge web technologies and innovative design patterns.
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div ref={eventsRef} className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 max-w-5xl mx-4 text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
          </div>
        </section>

        {/* Services Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div ref={servicesRef} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-4 text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Our Services
            </h2>
          </div>
        </section>

        {/* Contact Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div ref={contactRef} className="bg-gradient-to-tr from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-4 text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </div>
        </section>

        {/* Spacer for smooth scrolling */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}