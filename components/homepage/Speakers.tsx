import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface SpeakerDetails {
  image: string;
  name: string;
  designation: string;
  about: string;
  link: string;
}

const speakers: SpeakerDetails[] = [
  {
    image: "/speakerImages/comingsoon.png",
    name: "Revealing Soon",
    designation: "",
    about:
      "Stay tuned for more updates.",
    link: "https://youtu.be/EE-xtCF3T94?si=Pk0tdOn_WSVOoAXi",
  },
  {
    image: "/speakerImages/comingsoon.png",
    name: "Revealing Soon",
    designation: "",
    about:
      "Stay tuned for more updates.",
    link: "https://youtu.be/EE-xtCF3T94?si=Pk0tdOn_WSVOoAXi",
  },
  {
    image: "/speakerImages/comingsoon.png",
    name: "Revealing Soon",
    designation: "",
    about:
      "Stay tuned for more updates.",
    link: "https://youtu.be/EE-xtCF3T94?si=Pk0tdOn_WSVOoAXi",
  },
  {
    image: "/speakerImages/comingsoon.png",
    name: "Revealing Soon",
    designation: "",
    about:
      "Stay tuned for more updates.",
    link: "https://youtu.be/EE-xtCF3T94?si=Pk0tdOn_WSVOoAXi",
  },
  {
    image: "/speakerImages/comingsoon.png",
    name: "Revealing Soon",
    designation: "",
    about:
      "Stay tuned for more updates.",
    link: "https://youtu.be/EE-xtCF3T94?si=Pk0tdOn_WSVOoAXi",
  },
  {
    image: "/speakerImages/comingsoon.png",
    name: "Revealing Soon",
    designation: "",
    about:
      "Stay tuned for more updates.",
    link: "https://youtu.be/EE-xtCF3T94?si=Pk0tdOn_WSVOoAXi",
  },
  {
    image: "/speakerImages/comingsoon.png",
    name: "Revealing Soon",
    designation: "",
    about:
      "Stay tuned for more updates.",
    link: "https://youtu.be/EE-xtCF3T94?si=Pk0tdOn_WSVOoAXi",
  },
  {
    image: "/speakerImages/comingsoon.png",
    name: "Revealing Soon",
    designation: "",
    about:
      "Stay tuned for more updates.",
    link: "https://youtu.be/EE-xtCF3T94?si=Pk0tdOn_WSVOoAXi",
  }
];

export default function Speakers() {
  return (
    <section className="min-h-screen mt-50 flex items-center justify-center">
      <div className="w-full sm:w-5/6 mx-4 text-white flex flex-col items-center gap-y-8">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center text-white">
          Speakers
        </h2>
        <Carousel opts={{ loop: true, align: "start" }} className="w-5/6">
          <CarouselContent>
            {speakers.map((speaker, index) => (
              <CarouselItem key={index} className="md:basis-1/4">
                <div className="h-full p-4 bg-indigo/80 rounded-3xl border-2 border-black drop-shadow-2xl flex flex-col gap-y-4">
                  <div className="rounded-xl w-full aspect-square grid place-items-center bg-blue-900/20">
                    <Image
                      height={400}
                      width={400}
                      src={speaker.image}
                      alt={speaker.name}
                    />
                  </div>
                  <h4 className="text-3xl font-bold px-2">{speaker.name}</h4>
                  <div className="flex flex-col gap-y-3 justify-between p-3 rounded-xl bg-slate-800/60 h-full">
                    <p>{speaker.about}</p>
                    <div className="flex items-center justify-center gap-x-3 w-full">
                      <div className="flex-1 grid place-items-center">
                        <Link
                          href={speaker.link}
                          className="rounded-full border border-white/60 py-1 px-3 text-sm"
                        >
                          Learn More
                        </Link>
                      </div>
                      <div className="h-full w-[1px] bg-gray-400/40"></div>
                      <p className="flex-1 text-center uppercase">
                        {speaker.designation}
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
