export default function Coaches() {
  return (
    <section className="snap-section h-screen snap-start relative w-full overflow-hidden flex items-center bg-neutral-50" id="coaches">
      <div className="container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="mb-12 reveal">
          <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">
            The Mentors
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900">
            Who We Are
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Coach 1 */}
          <div className="group reveal delay-100">
            <div className="relative w-full aspect-square max-w-sm mx-auto overflow-hidden bg-white shadow-xl rounded-2xl mb-6">
              <img src="/alexi.png" alt="Alexi" className="w-full h-full object-cover hover-scale-img block" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-1 text-neutral-900">Alexi</h3>
              <p className="text-neutral-500 font-mono text-sm mb-4">HEAD ANALYST</p>
              <p className="text-neutral-600 text-sm max-w-xs mx-auto md:mx-0">
                The architect of logic. Alexi specializes in higher timeframe storylines and the mathematical precision of the "fresh vs unfresh" 2-touch rule.
              </p>
            </div>
          </div>

          {/* Coach 2 */}
          <div className="group reveal delay-200">
            <div className="relative w-full aspect-square max-w-sm mx-auto overflow-hidden bg-white shadow-xl rounded-2xl mb-6">
              <img src="/domf.png" alt="Dom'f" className="w-full h-full object-cover hover-scale-img block" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-1 text-neutral-900">Dom'f</h3>
              <p className="text-neutral-500 font-mono text-sm mb-4">EXECUTION SPECIALIST</p>
              <p className="text-neutral-600 text-sm max-w-xs mx-auto md:mx-0">
                The execution machine. Dom'f translates theory into live market application, mastering the psychology of holding through roadblocks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}