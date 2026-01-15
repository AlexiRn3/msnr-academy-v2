"use client"; // Obligatoire pour utiliser usePathname

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  // Liste des pages où on veut CACHER la navbar
  const hiddenRoutes = ["/login", "/signup", "/auth", "/dashboard"];
  
  // Si l'URL actuelle est dans la liste, on ne retourne rien (null)
  if (hiddenRoutes.some(route => pathname.startsWith(route))) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
      <div className="pointer-events-auto">
        <Link href="/" className="font-bold text-xl tracking-tight">
          MSNR<span className="text-red-600">.</span>ACADEMY
        </Link>
      </div>
      <div className="pointer-events-auto">
        <Link 
          href="/login" 
          className="group relative px-6 py-2 border border-white/30 rounded-full overflow-hidden inline-flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300"
        >
          <span className="relative z-10 text-sm font-medium">Member Login</span>
          <span className="material-symbols-outlined text-sm relative z-10 group-hover:translate-x-1 transition-transform">
            login
          </span>
        </Link>
      </div>
    </nav>
  );
}