'use client'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './homepage/HeroSection';
import About from './homepage/AboutSection';
import Events from './homepage/EventSection';
import Speakers from './homepage/Speakers';
import Sponsors from './homepage/Sponsors';
import Gallery from './homepage/Gallery';
import Footer from './Footer';
import PreFooter from './homepage/PreFooter';
// import { FloatingNavbar } from './homepage/Navbar';

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
  const speakersRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen width
    if (window.innerWidth < 1024) return;
    const mobileCheck = window.innerWidth < 1024;
    setIsMobile(mobileCheck);

    const ctx = gsap.context(() => {
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
            start: "top top%",
            end: "top bottom",
            scrub: 1,
          },
        }
      );

      // Speakers section reveal
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

      // Sponsors section reveal
      gsap.fromTo(sponsorsRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sponsorsRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-clip">
      {/* Fixed Background Layer */}
      <div className="fixed h-full overflow-hidden z-0">
        <div
          ref={backgroundRef}
          className="h-full"
          style={{
            backgroundImage: 'url(/background.png)',
            width: isMobile ? '100vw' : `${(16534 / 972) * 100}vh`,
            height: '100vh',
            backgroundSize: isMobile ? 'cover' : 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
          }}
        />
      </div>

      {/* <FloatingNavbar /> */}
      {/* Content Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef}>
          <Hero />
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about">
          <About />
        </section>

        <section ref={eventsRef} id="events">
          <Events />
        </section>

        {/* Events Section */}
        <section ref={speakersRef}>
          <Speakers />
        </section>

        {/* Services Section */}
        <section ref={sponsorsRef}>
          <Sponsors />
        </section>

        {/* Contact Section */}
        <section ref={galleryRef}>
          <Gallery />
        </section>

        <PreFooter />
        <Footer />
      </div>
    </div>
  );
}