import TypingText from './TypingText';
export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 transition-opacity duration-700 ease-out will-change-transform">
            <TypingText text="Rent Anything. Anytime." typingSpeed={35} />
            <span className="block bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 bg-clip-text text-transparent">
              <TypingText text="Hassle-Free" typingSpeed={35} startDelay={1100} />
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 opacity-90">From furniture to appliances, bikes to tools – discover thousands of items available for rent in your neighborhood. Save money, reduce waste, and get what you need when you need it.</p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">↗</span>
            Join 50,000+ happy renters
            <span className="text-rose-500">♥</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/list-item" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-tr from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow hover:opacity-95 transform transition-transform hover:scale-[1.02]">List an Item →</a>
            <a href="/browse" className="rounded-md border px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50 transform transition-transform hover:scale-[1.02]">Browse Items</a>
            <a href="/request-item" className="rounded-md border px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50 transform transition-transform hover:scale-[1.02]">Request Item</a>
          </div>

          <div className="mt-10 mx-auto max-w-2xl">
            <div className="relative">
              <input className="w-full rounded-full border px-5 py-4 pr-28 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Search for furniture, appliances, bikes, and more..." />
              <button className="absolute right-1 top-1 h-[46px] rounded-full bg-amber-400 px-6 font-semibold text-white hover:opacity-95 transition-transform active:scale-95">Search</button>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-gray-600">
          <div className="rounded-xl bg-emerald-50 py-4">Secure & Safe</div>
          <div className="rounded-xl bg-sky-50 py-4">Flexible Duration</div>
          <div className="rounded-xl bg-violet-50 py-4">Community Driven</div>
          <div className="rounded-xl bg-amber-50 py-4">Quality Guaranteed</div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_80%_-10%,#fdf6e3_10%,transparent_40%),radial-gradient(50rem_50rem_at_10%_10%,#ecfeff_10%,transparent_40%)]"></div>
    </section>
  );
}
