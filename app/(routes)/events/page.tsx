'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { eventData } from '@/assets/eventData';
import Link from 'next/link';
import { EventDirectionAwareHover } from '@/components/ui/event-direction-aware-hover';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EventPage = () => {
  const containerRef = useRef(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(backgroundRef.current, {
        x: "-10%", // Reduced movement to prevent clipping
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".event-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden" 
    >
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/background.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '150vw',
          height: '110vh',
          minWidth: '100vw',
          minHeight: '100vh',
        }}
      >
        <div className="absolute inset-0 bg-[#1b1c3d]/70" />
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Header Section */}
        <section ref={headerRef}>
          <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h2 className="text-3xl text-[#c085fd] font-extrabold tracking-tight sm:text-4xl">
                  Events
                </h2>
                <p className="text-xl text-[#eae2b7]">
                  Discover our upcoming events and be part of the experience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid Section */}
        <section ref={gridRef}>
          <div className="max-w-7xl mx-auto py-2 px-4 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {eventData.map((event, idx) => (
                <Link key={idx} href={`/events/${event.eventSlug}`} className="event-card relative w-full aspect-video overflow-hidden rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                 <EventDirectionAwareHover imageUrl={`${event.imageUrl}`} className="relative h-full w-full overflow-visible border-2 border-[#c085fd]/20" >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="space-y-2">
                        <p className="font-bold text-2xl text-white drop-shadow-lg">{event.eventName}</p>
                        <p className="font-normal text-lg text-[#eae2b7] drop-shadow-lg">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </EventDirectionAwareHover>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventPage;
