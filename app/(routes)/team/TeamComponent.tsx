'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { teams } from './TeamData';
import clsx from 'clsx';


// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TeamPage = () => {
  const containerRef = useRef(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeTeam, setActiveTeam] = useState(teams[0].name);
  const [isMobile, setIsMobile] = useState(false);
  
  const activeMembers = teams.find(team => team.name === activeTeam)?.members ?? [];

  useEffect(() => {
    // Detect screen width
    const mobileCheck = window.innerWidth < 1024;
    setIsMobile(mobileCheck);

    const ctx = gsap.context(() => {
      if (!mobileCheck) {
        gsap.to(backgroundRef.current, {
          x: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }

      // Header animation
      gsap.fromTo(headerRef.current,
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

      // Grid items animation
      gsap.fromTo(".team-member-card",
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

  // Re-animate when team changes
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(".team-member-card",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
        }
      );
    }
  }, [activeTeam]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* Extended Background Layer - Show more of the SVG */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/background.svg)',
          backgroundSize: 'auto 120%', 
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
          width: '180vw',
          height: '100vh', 
          minWidth: '100vw',
          minHeight: '100vh',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#1b1c3d]/70" /> {/* Slightly less opacity to show more background */}
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Header Section */}
        <section ref={headerRef}>
          <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h2 className="text-3xl text-[#c085fd] font-extrabold tracking-tight sm:text-4xl">
                  {activeTeam || "The "} Team
                </h2>
                <p className="text-xl text-[#eae2b7]">
                  Meet the people behind the scenes who make this event possible
                </p>
              </div>

              {/* Team Tabs */}
              <div className="sm:block bg-[#101720]/80 backdrop-blur-sm rounded-xl shadow-lg border border-[#c085fd]/20">
                <nav className="relative z-0 flex overflow-x-auto" aria-label="Tabs">
                  {teams.map((team, tabIdx) => (
                    <button
                      key={team.name}
                      onClick={() => setActiveTeam(team.name)}
                      className={clsx(
                        team.name === activeTeam
                          ? 'text-[#101720] bg-[#c085fd]'
                          : 'text-[#eae2b7] hover:bg-[#c085fd]/20 hover:text-[#c085fd]',
                        tabIdx === 0 ? 'rounded-l-xl' : '',
                        tabIdx === teams.length - 1 ? 'rounded-r-xl' : '',
                        'group relative min-w-0 flex-1 py-3 px-6 text-sm font-medium text-center transition-all duration-200 border-r border-[#c085fd]/10 last:border-r-0 cursor-pointer'
                      )}
                      aria-current={team.name === activeTeam ? 'page' : undefined}
                    >
                      <span>{team.name || 'Heads'}</span>
                      {/* Active indicator */}
                      {team.name === activeTeam && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-[#101720] rounded-full" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Grid Section */}
        <section ref={gridRef}>
          <div className="max-w-7xl mx-auto py-2 px-4 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              {activeMembers.map((member, idx) => (
                <div 
                  key={idx} 
                  className="team-member-card relative w-full aspect-[5/5] overflow-hidden rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <DirectionAwareHover 
                    imageUrl={member.imageUrl} 
                    className="relative h-full w-full overflow-visible border-2 border-[#c085fd]/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="space-y-2">
                        <p className="font-bold text-2xl text-white drop-shadow-lg">{member.name}</p>
                        <p className="font-normal text-lg text-[#eae2b7] drop-shadow-lg">{member.role}</p>
                        
                        {/* Social Links */}
                        <div className="flex space-x-3 mt-4">
                          {member.instaUrl && (
                            <Link
                              href={member.instaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-3 bg-black/60 backdrop-blur-sm rounded-full hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 border border-white/20"
                            >
                              <FaInstagram className="w-5 h-5 text-white" />
                            </Link>
                          )}
                          {member.linkedinUrl && (
                            <Link
                              href={member.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-3 bg-black/60 backdrop-blur-sm rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 border border-white/20"
                            >
                              <FaLinkedin className="w-5 h-5 text-white" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#c085fd]/10 to-[#eae2b7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </DirectionAwareHover>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default TeamPage;