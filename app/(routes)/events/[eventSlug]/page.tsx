"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { eventData, inspiraTalksSpeakers } from "@/assets/eventData";
import { Event } from "@/types/all";
import Link from "next/link";
import Image from "next/image";
import DevfolioButton from "@/components/DevfolioButton";

export default function Page() {
  const { eventSlug } = useParams();
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const eventDetails = eventData.find((e: Event) => e.eventSlug === eventSlug);

  if (!eventSlug || !eventDetails) {
    router.push("/404");
    return null;
  }

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-800 via-slate-900 to-black text-white">
      {/* Navigation */}
      <nav className="hidden sm:flex justify-center py-8">
        <div className="flex space-x-8 bg-slate-700/50 backdrop-blur-sm rounded-full px-8 py-3">
          {eventData.map((event) => (
            <Link
              href={`/events/${event.eventSlug}`}
              key={event.eventSlug}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {event.eventName}
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center px-4 pt-12 sm:pt-0 mb-16 flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8 tracking-wider text-gray-200">
          {eventDetails.eventName}
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
          {eventDetails.about}
        </p>
        <Link href={eventDetails.registrationLink??"#"} className="bg-gray-200 hover:bg-white text-black font-semibold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer">
          Register
        </Link>
      </div>

      {/* Description Section */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <p className="text-gray-300 leading-relaxed text-center">
          {eventDetails.description}
        </p>
      </div>

      {/* Rounds Section */}
      {eventDetails.rounds.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">
            Rounds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventDetails.rounds.map((round, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30"
              >
                <div className="bg-purple-400 text-black px-4 py-2 rounded-full font-semibold inline-block mb-4 capitalize">
                  {round.number}
                </div>
                <h3 className="text-2xl font-bold mb-2 capitalize">
                  {round.title}
                </h3>
                <p className="text-gray-300 mb-4 capitalize">{round.about}</p>
                <div className="flex items-center text-gray-400">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                  <span className="capitalize">{round.mode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Speakers for Inspira Talks */}
      {eventDetails.eventSlug === "inspira-talks" && (
        <div className="w-full flex flex-col gap-8 items-center mb-12">
          <h1 className="text-4xl font-bold">Speakers</h1>
          <div className="flex flex-col md:flex-row flex-wrap gap-8">
            {inspiraTalksSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="flex flex-col rounded-2xl p-6 bg-slate-800/50 border border-gray-300/10"
              >
                <Image
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  width={300}
                  height={300}
                  className="rounded-xl bg-light-purple/10"
                />
                <h2 className="text-xl mt-3 font-semibold">{speaker.name}</h2>
                <p className="text-light-purple">{speaker.designation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Points of Contact */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">
          Points of Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventDetails.contact.map((contact, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 text-center"
            >
              <h3 className="text-xl font-bold mb-2 capitalize">
                {contact.name}
              </h3>
              <p className="text-gray-400 mb-6">+91{contact.number}</p>
              <a
                href={
                  contact.link.startsWith("http")
                    ? contact.link
                    : `https://${contact.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center mx-auto transition-colors w-fit"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ and Sponsors Section */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {eventDetails.faq.map((faqItem, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700"
                >
                  <button
                    className="w-full p-4 text-left flex justify-between items-center"
                    onClick={() => toggleDropdown(`faq-${index}`)}
                  >
                    <span className="capitalize">{faqItem.question}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${activeDropdown === `faq-${index}` ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {activeDropdown === `faq-${index}` && (
                    <div className="px-4 pb-4 text-gray-300 capitalize">
                      {faqItem.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
