import Link from "next/link";

export default function MinimalFooter() {
  return (
    <footer className="w-full bg-black border-t border-neutral-900 py-10 px-6 z-50 relative">
      <div className="container mx-auto max-w-7xl">
        
        {/* Partie Haute : Liens & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-neutral-500 text-xs">
            © 2026 MSNR Academy. Designed by Alexi.
          </div>
          
          <div className="flex gap-6 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Risk Disclosure</Link>
          </div>
        </div>
        {/* Partie Basse : Le Disclaimer Trading (CRUCIAL pour le "Pro") */}
        {/*<div className="border-t border-neutral-900 pt-8 text-[10px] leading-relaxed text-neutral-600 text-justify">
          <p className="mb-2">
            <strong className="text-neutral-400">HIGH RISK WARNING:</strong> Trading Futures, Forex, CFDs, and Options involves a substantial risk of loss and is not suitable for every investor. The valuation of futures and options may fluctuate, and, as a result, clients may lose more than their original investment. 
          </p>
          <p className="mb-2">
            <strong>Hypothetical Performance Disclosure:</strong> Hypothetical performance results have many inherent limitations, some of which are described below. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown. In fact, there are frequently sharp differences between hypothetical performance results and the actual results subsequently achieved by any particular trading program.
          </p>
          <p>
            MSNR Academy is an educational platform and does not provide financial advice. Content is for educational purposes only. Past performance is not indicative of future results.
          </p>
        </div>*/}
      </div>
    </footer>
  );
}