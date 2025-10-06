import Image from "next/image";

interface Sponsor {
  logo: string; 
}

const SponsorItem: React.FC<Sponsor> = ({ logo }) => {
  return (    
      <Image
        src={logo}
        alt={"logo"}
        width={100}
        height={100}
      />
  );
};

const PreviousSponsor: React.FC<{ sponsors: Sponsor[] }> = ({ sponsors }) => {
  return (
    <div className="previous-sponsor-list">
      {sponsors.map((sponsor, index) => (
        <div key={index} className="previous-sponsor-item">
          <SponsorItem logo={sponsor.logo}  />
        </div>
      ))}
      <style jsx>{`
        .previous-sponsor-list {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          /* overflow-x: auto;  Enable horizontal scrolling */
          gap: 30px;
          padding: 20px;
          max-width: 100vw;
        }

        .grayscale {
          filter: grayscale(100%); /* Make images grayscale */
        }

        /* For WebKit browsers (like Chrome, Safari) to hide scrollbar */
        div.previous-sponsor-list::-webkit-scrollbar {
          height: 8px;
        }
        div.previous-sponsor-list::-webkit-scrollbar-thumb {
          background-color: #fcbf49;
          border-radius: 10px;
        }
        div.previous-sponsor-list::-webkit-scrollbar-track {
          background-color: #101720;
        }
      `}</style>
    </div>
  );
};

export default function Sponsors() {
    const sponsors: Sponsor[] = [
            { logo: "/previous-sponsor/1.png" },
            { logo: "/previous-sponsor/2.png" },
            { logo: "/previous-sponsor/3.png" },
            { logo: "/previous-sponsor/4.png" },
            { logo: "/previous-sponsor/5.png" },
            { logo: "/previous-sponsor/6.png" },
            { logo: "/previous-sponsor/7.png" },
            { logo: "/previous-sponsor/8.png" },
            { logo: "/previous-sponsor/9.png" },
            { logo: "/previous-sponsor/10.png" },
            { logo: "/previous-sponsor/11.png" },
            { logo: "/previous-sponsor/12.png" },
            { logo: "/previous-sponsor/13.png" },
            { logo: "/previous-sponsor/14.png" },
            { logo: "/previous-sponsor/15.png" },
            { logo: "/previous-sponsor/16.png" },
            { logo: "/previous-sponsor/17.png" },
            { logo: "/previous-sponsor/18.png" },
            { logo: "/previous-sponsor/19.png" },
            { logo: "/previous-sponsor/20.png" },
            { logo: "/previous-sponsor/21.png" },
            { logo: "/previous-sponsor/22.png" },
            { logo: "/previous-sponsor/23.png" },
            // Add more sponsors as needed
        ];

    return (
        <section className="min-h-screen flex items-center justify-center mt-80">
            <div className="bg-gradient-to-br backdrop-blur-2xl border border-white/20 rounded-2xl p-8 md:p-12 max-w-5xl mx-4 text-white">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center text-white bg-clip-text">
                    Previous Sponsors
                </h2>
                <PreviousSponsor sponsors={sponsors} />
            </div>
        </section>
    )
}