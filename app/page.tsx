"use client";

import { useEffect } from "react";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import Coaches from "@/components/Coaches"; // On importe le nouveau composant

export default function Home() {
  
  useEffect(() => {
    // Le moteur d'animation (Observer)
    const observerOptions = {
      root: document.getElementById("main-scroller"),
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    // Petit délai pour laisser le temps aux composants enfants (Coaches, Footer...) de se charger
    setTimeout(() => {
        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="snap-container h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth" id="main-scroller">
      
      {/* --- SECTION 1: HERO (Reste ici pour l'instant) --- */}
      <section className="snap-section h-screen snap-start relative w-full overflow-hidden flex flex-col justify-center bg-white" id="home">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            alt="Abstract Swiss Background"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="container mx-auto px-6 z-10 h-full flex flex-col justify-center">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-10">
              <h1 className="text-swiss-huge font-black uppercase mb-6 reveal text-neutral-900">
                Market<br />
                <span className="text-red-600">Logic</span><br />
                Refined
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 mt-8 reveal delay-200">
              <div className="swiss-grid-line mb-6 pt-4 border-t border-black/10"></div>
              <p className="text-lg md:text-xl leading-relaxed font-light text-neutral-600">
                Stop guessing. Start understanding. MSNR Academy deconstructs the "Why" behind price movement with the precision of Malaysian SnR philosophy.
                <span className="block mt-4 font-medium text-black">
                  A modern approach to line charts, storylines, and liquidity.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 animate-bounce">
          <span className="material-symbols-outlined text-3xl opacity-50 text-black">
            keyboard_arrow_down
          </span>
        </div>
      </section>

      {/* --- SECTION 2: COACHES --- */}
      <Coaches />

      {/* --- SECTION 3: PRICING --- */}
      <PricingSection />

      {/* --- SECTION 4: FOOTER --- */}
      <Footer />

    </main>
  );
}