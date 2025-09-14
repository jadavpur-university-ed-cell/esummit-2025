export default function LaunchXHero() {
  return (
    <section className="w-full bg-[#1C1C24] flex flex-col items-center pt-24 pb-32">
      {/* Logo */}
      <img
        src="/launchx-logo.png"
        alt="LaunchX Logo"
        className="w-[1016px] h-[389px] object-contain"
      />

      {/* Subtitle */}
      <p className="text-white text-center max-w-[1333px] mt-6 font-poppins text-[32px] font-medium leading-[45px]">
        Launch X is where bold startup ideas meet world-class mentors and
        investors. Pitch, refine, and fast-track your venture with the
        ecosystem’s best
      </p>

      {/* Register Button */}
      <button className="mt-10 px-12 py-4 bg-white rounded-full text-black text-[24px] font-semibold shadow-lg hover:bg-gray-200">
        Register
      </button>

      {/* About Text */}
      <p className="text-[#D4D4D8] text-center max-w-[1355px] mt-16 font-poppins text-[32px] font-medium leading-[45px]">
        Launch X is the perfect platform for aspiring entrepreneurs to showcase
        their innovations and gain valuable feedback from industry experts to
        achieve the next step in their startup journey. With esteemed partners
        such as NASSCOM, IVC, TiE Kolkata, and WeWork Labs from previous
        editions, our reputation speaks for itself. Begin your journey by
        showcasing your startup idea, where you will fine-tune and launch your
        venture with guidance from top-tier mentors and support from over 20,000
        passionate business aficionados. Navigate through these thrilling rounds:
      </p>

      {/* Rounds Heading */}
      <h2
        className="mt-24 text-center font-geist text-[105.3px] font-semibold leading-[117px]
        bg-gradient-to-br from-[#4B5563] to-[#E4E4E7] bg-clip-text text-transparent"
      >
        Rounds
      </h2>
    </section>
  )
}
