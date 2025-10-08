export default function SkeletonLoader() {
  return (
    <div
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
      }}
      className="pb-10 min-h-screen text-[#AFB2F5]"
    >
      <main className="px-8 md:px-[6vw] pt-20 font-medium">
        {/* Header Skeleton */}
        <header className="flex flex-wrap justify-between items-center py-8 gap-4 border-b border-white/10">
          <div className="h-10 w-32 bg-white/10 rounded-md" />
          <div className="h-10 w-48 bg-white/10 rounded-md" />
          <div className="h-10 w-32 bg-white/10 rounded-md" />
        </header>

        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Merchandise Skeleton */}
          <div className="order-2 md:order-1">
            <section className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col items-center">
              <div className="h-6 w-40 bg-white/10 rounded-md mb-5" />
              <div className="my-4 w-full max-w-xs flex justify-center">
                <div className="w-40 h-40 bg-white/10 rounded-lg" />
              </div>
              <div className="mt-6 w-full">
                <div className="h-10 bg-white/10 rounded-md mb-3" />
                <div className="h-10 bg-white/10 rounded-md mb-3" />
                <div className="h-10 bg-white/10 rounded-md" />
              </div>
            </section>
          </div>

          {/* Profile Skeleton */}
          <div className="order-1 md:order-2">
            <section className="flex flex-col md:flex-row justify-between gap-8 p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <div className="flex flex-col gap-6 w-full md:w-2/3">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-32 bg-white/10 rounded-md" />
                  <div className="h-8 w-20 bg-white/10 rounded-md" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-base w-full">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="h-4 w-20 bg-white/10 rounded" />
                      <div className="h-5 w-28 bg-white/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 self-center md:self-start">
                <div className="w-full h-full rounded-full bg-white/10" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
