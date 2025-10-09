import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-white">
      <div className="flex flex-col items-center text-center space-y-8 px-4">
        <Image
          src="/home/logo.svg"
          alt="E-Summit Logo"
          width={500}
          height={500}
          className="w-[80vw] md:w-[65vw] drop-shadow-[(0 px 32px rgba(80, 0, 180, 0.45)]"
        />
        <p className="md:text-2xl max-w-2xl mx-auto font-semibold text-[#c084fc]">
          Jadavpur University Entrepreneurship Cell Presents the Fifth Edition
          of Our Flagship Event
        </p>
      </div>
    </section>
  );
}
