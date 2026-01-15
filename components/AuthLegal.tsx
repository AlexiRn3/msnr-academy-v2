import Link from "next/link";

export default function AuthLegal() {
  return (
    <div className="mt-12 pt-8 border-t border-neutral-100 text-center w-full max-w-xs mx-auto">
      
      {/* Disclaimer Résumé */}
      <p className="text-[10px] text-neutral-400 leading-relaxed mb-4">
        Trading Futures and CFDs involves significant risk of loss. 
        <br />
        This is an educational platform, not financial advice.
      </p>

      {/* Liens Discrets */}
      <div className="flex justify-center gap-4 text-[10px] text-neutral-500 font-medium tracking-wide uppercase">
        <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
        <Link href="#" className="hover:text-black transition-colors">Terms</Link>
        <Link href="#" className="hover:text-black transition-colors">Risk Disclosure</Link>
      </div>

      <div className="mt-4 text-[10px] text-neutral-300">
        © 2026 MSNR Academy.
      </div>
    </div>
  );
}