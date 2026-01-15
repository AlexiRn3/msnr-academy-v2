export default function PricingSection() {
  return (
    <section className="snap-section flex items-center bg-black text-white" id="pricing">
      <div className="container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2 block">Curriculum</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Choose Your Path</h2>
            </div>
        </div>

        {/* Grid des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[60vh] md:h-auto overflow-y-auto md:overflow-visible pb-10 md:pb-0">
                    
                    <div className="relative bg-neutral-900 p-8 rounded-none border border-neutral-800 hover:border-neutral-600 transition-colors group flex flex-col reveal delay-100 active">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2 text-white">The Foundation</h3>
                            <div className="text-3xl font-mono text-neutral-300">$67</div>
                        </div>
                        <p className="text-sm text-neutral-400 mb-8 border-b border-neutral-800 pb-6 min-h-[60px]">
                            Understand the 'Why' behind price movement. Perfect for mastering the logic of Malaysian SNR.
                        </p>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                Introduction to MSNR Philosophy
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                The Art of SnR (Line Chart Secrets)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                Fresh vs Unfresh (2-Touch Rule)
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                Identifying Gap Levels &amp; Shapes
                            </li>
                        </ul>
                        <button className="w-full py-3 border border-white text-white font-medium text-sm hover:bg-white hover:text-black transition-colors uppercase tracking-wider">
                            Select Plan
                        </button>
                    </div>

                    <div className="relative bg-white text-black p-8 rounded-none transform md:-translate-y-4 shadow-2xl z-10 flex flex-col reveal delay-200 active">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 tracking-widest">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">The SOP Strategy</h3>
                            <div className="text-3xl font-mono text-red-600">$247</div>
                        </div>
                        <p className="text-sm text-neutral-600 mb-8 border-b border-neutral-200 pb-6 min-h-[60px]">
                            A complete, rule-based execution system. Learn exactly 'How' and 'When' to enter the market.
                        </p>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-600">check_circle</span>
                                Everything in The Foundation
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-600">check_circle</span>
                                Storyline Module (MTF Flow)
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-600">check_circle</span>
                                3 Entry Setups (Low to High Risk)
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-600">check_circle</span>
                                King Zulfan's Engulfing System
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-600">check_circle</span>
                                Prop Firm Risk Blueprint
                            </li>
                        </ul>
                        <button className="w-full py-3 bg-red-600 text-white font-bold text-sm hover:bg-black transition-colors uppercase tracking-wider shadow-lg">
                            Get Access
                        </button>
                    </div>

                    <div className="relative bg-neutral-900 p-8 rounded-none border border-neutral-800 hover:border-neutral-600 transition-colors group flex flex-col reveal delay-300 active">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2 text-white">Mastery Mentorship</h3>
                            <div className="text-3xl font-mono text-neutral-300">$497</div>
                        </div>
                        <p className="text-sm text-neutral-400 mb-8 border-b border-neutral-800 pb-6 min-h-[60px]">
                            Accelerate your path to consistency with direct feedback and personalized trade reviews.
                        </p>
                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                Everything in SOP Strategy
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                Weekly Live Q&amp;A &amp; Analysis
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                Personalized Trade Corrections
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                Advanced Psychology Training
                            </li>
                            <li className="flex items-start gap-3 text-sm text-neutral-300">
                                <span className="material-symbols-outlined text-xs mt-1 text-red-500">check_circle</span>
                                VIP Inner Circle Discord
                            </li>
                        </ul>
                        <button className="w-full py-3 border border-white text-white font-medium text-sm hover:bg-white hover:text-black transition-colors uppercase tracking-wider">
                            Apply Now
                        </button>
                    </div>

                </div>
      </div>
    </section>
  );
}