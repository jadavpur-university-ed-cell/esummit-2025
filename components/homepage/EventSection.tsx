import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: number;
  name: string;
  about: string;
  route: string;
  image: string;
  day: string;
}

const eventList: Event[] = [
  {
    id: 1,
    name: "Mock Stock",
    about:
      "Master trading skills in a risk-free, competitive stock simulation.",
    route: "/events/mockstock",
    image: "/event-logos/MockStock.png",
    day: "Day 1",
  },
  {
    id: 2,
    name: "Hack <N> Pitch",
    about: "Join Hack-n-Pitch: Innovate, hack, and pitch your ideas overnight!",
    route: "/events/hacknpitch",
    image: "/event-logos/HackNPitch.png",
    day: "Day 2",
  },
  {
    id: 3,
    name: "Corporate Clash",
    about: "Test your strategic skills in the ultimate analyst challenge.",
    route: "/events/corporateclash",
    image: "/event-logos/CorporateClash.png",
    day: "Day 1",
  },
  {
    id: 4,
    name: "Inspira Talks",
    about: "Learn from top experts and ignite your entrepreneurial journey.",
    route: "/events/inspiratalks",
    image: "/event-logos/inspiratalks.png",
    day: "Day 1 and 2",
  },
  {
    id: 5,
    name: "Mock IPL Auction",
    about: "Build your dream IPL team in a strategic mock auction.",
    route: "/events/mockipl",
    image: "/event-logos/MockIPL.png", // Add appropriate image,
    day: "Day 1",
  },
  {
    id: 6,
    name: "Dizmart",
    about:
      "Design impactful labels at Dizmart, merging creativity, branding, and marketing.",
    route: "/events/dizmart",
    image: "/event-logos/Dizmart.png",
    day: "Day 2",
  },
  {
    id: 7,
    name: "LaunchX",
    about: "Showcase, pitch, and launch your startup with expert backing.",
    route: "/events/launchx",
    image: "/event-logos/LaunchX.png",
    day: "Day 3",
  },
];

export default function Events() {
  return (
    <section className="min-h-screen mt-100 flex items-center justify-center">
      <div className="w-full sm:w-5/6 mx-4 text-white flex flex-col items-center gap-y-8">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center text-white">
          Events
        </h2>
        <Carousel opts={{ loop: true, align: "start" }} className="w-5/6">
          <CarouselContent className="pl-4">
            {eventList.map((event) => (
              <CarouselItem key={event.id} className="basis-1/4">
                <div className="h-full p-4 bg-indigo/80 rounded-3xl border-2 border-black drop-shadow-2xl flex flex-col gap-y-4">
                  <div className="rounded-xl w-full aspect-square grid place-items-center bg-blue-900/20">
                    <Image
                      height={400}
                      width={400}
                      src={event.image}
                      alt={event.name}
                    />
                  </div>
                  <h4 className="text-3xl font-bold px-2">{event.name}</h4>
                  <div className="flex flex-col gap-y-3 justify-between p-3 rounded-xl bg-slate-800/60 h-full">
                    <p>{event.about}</p>
                    <div className="flex items-center justify-center gap-x-3 w-full">
                      <div className="flex-1 grid place-items-center">
                        <Link
                          href={event.route}
                          className="rounded-full border border-white/60 py-1 px-3 text-sm"
                        >
                          Learn More
                        </Link>
                      </div>
                      <div className="h-full w-[1px] bg-gray-400/40"></div>
                      <p className="flex-1 text-center uppercase">
                        {event.day}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-lavender" />
          <CarouselNext className="bg-lavender" />
        </Carousel>
      </div>
    </section>
  );
}
