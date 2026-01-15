import Link from "next/link";

export default function Footer() {
  return (
    <section className="snap-section h-screen snap-start relative w-full overflow-hidden flex flex-col items-center justify-center bg-black text-white" id="footer">
      <div className="container mx-auto px-6 text-center reveal">
        {/* Le gros titre en fond */}
        <h2 className="text-8xl md:text-9xl font-black text-neutral-800 mb-8 select-none">
          MSNR
        </h2>

        <h3 className="text-3xl font-bold mb-6 text-white">
          Ready to chart your own path?
        </h3>

        <div className="flex flex-col gap-4 justify-center items-center">
          <Link 
            href="/signup"
            className="bg-white text-black px-10 py-4 text-lg font-medium rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-xl"
          >
            Join the Academy
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-6 w-full text-center text-xs text-neutral-500">
        © 2026 MSNR Academy. All rights reserved. <br />
        Designed by Alexi.
      </footer>
    </section>
  );
}