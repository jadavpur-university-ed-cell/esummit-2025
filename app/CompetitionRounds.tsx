const rounds = [
  { title: "Round 1", name: "Screening Round", desc: "Preliminary Submission", mode: "Offline" },
  { title: "Round 2", name: "Screening Round", desc: "Preliminary Submission", mode: "Offline" },
  { title: "Round 3", name: "Screening Round", desc: "Preliminary Submission", mode: "Offline" },
  { title: "Round 4", name: "Screening Round", desc: "Preliminary Submission", mode: "Offline" },
]

export default function CompetitionRounds() {
  return (
    <section className="w-full py-16 bg-[#1C1C24]">
      <h2 className="text-center text-gray-300 text-[48px] font-bold mb-12">Rounds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
        {rounds.map((round, i) => (
          <div
            key={i}
            className="w-[608px] h-[338px] bg-[#B7B7E0] rounded-[56px] shadow-lg p-8 flex flex-col justify-between"
          >
            <div className="flex">
              <span className="bg-[#C8A4FC] rounded-[19px] px-6 py-3 text-black font-semibold text-[32px] shadow-md">
                {round.title}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[32px] font-semibold text-black">{round.name}</h3>
              <p className="text-[24px] text-black">{round.desc}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[20px] text-black">📍 {round.mode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
