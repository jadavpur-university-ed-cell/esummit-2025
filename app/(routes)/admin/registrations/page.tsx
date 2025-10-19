import React from "react";
import { eventData } from "@/assets/eventData";
import Link from "next/link";

function Page() {
  return (
    <div className="bg-indigo min-h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-y-10">
        <h1 className="text-5xl font-bold text-white">
          Event Registrations Dashboard
        </h1>
        <div className="grid grid-cols-3 gap-x-8 text-center">
          {eventData.map((event) => (
            <Link
              href={`/admin/registrations/${event.eventSlug}`}
              key={event.eventSlug}
              className="text-white text-lg underline underline-offset-2"
            >
              {event.eventName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
