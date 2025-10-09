import Link from "next/link";
import Image from "next/image";
export default function PreFooter() {
  return (
    <main className="mt-1 mx-auto px-4 sm:mt-80 min-h-[40vh] bg-gradient-to-b from-transparent via-indigo/70 to-indigo">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-bold text-[#eae2b7] sm:text-5xl md:text-6xl">
          <span className="block xl:inline text-lavender">6 Events.</span>{" "}
          <span className="block text-light-purple xl:inline">3 Days.</span>{" "}
          <span className="block text-lavender xl:inline">2 Venues</span>
        </h1>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-xl">
            <Link
              href="https://maps.app.goo.gl/dSx4nDjFR45xCQHC7"
              target="blank"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-gray-100 bg-light-purple hover:bg-lavender hover:text-[#101720] md:py-4 md:text-lg md:px-10"
            >
              Venue
            </Link>
          </div>
          <div className="mt-3 rounded-xl sm:mt-0 sm:ml-3">
            <Link
              href="https://maps.app.goo.gl/hhmjoZccCTMDHvNK9"
              target="blank"
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-[#101720] bg-lavender hover:bg-light-purple hover:text-gray-100 md:py-4 md:text-lg md:px-10"
            >
              Hackathon Venue
            </Link>
          </div>
        </div>
        <p className="mt-3 max-w-md mx-auto text-lg text-light-purple sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A 3-day entrepreneurial event awaits at the centre of Kolkata!
        </p>
        <span className="flex flex-col sm:flex-row justify-center min-h-2 text-white md:text-lg gap-x-16">
          <div className="w-full sm:w-fit flex justify-center">
            <Image
              src="/ecell.png"
              alt="E-Cell JU Logo"
              height={600}
              width={600}
              className="object-cover aspect-video mt-10 md:mt-0 w-[225px] h-[70px] md:w-[175px] md:h-[100px] 2xl:w-auto 2xl:h-[150px]"
            />
          </div>
          <h1 className="text-4xl font-light md:pt-10">
            IDEATE | INNOVATE | BUILD
          </h1>
        </span>
      </div>
    </main>
  );
}
