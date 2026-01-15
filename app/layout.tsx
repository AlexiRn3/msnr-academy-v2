import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar"; // On importe notre nouvelle Navbar intelligente
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSNR Academy | Master the Logic",
  description: "Market Logic Refined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className={`${inter.className} bg-white text-neutral-900 antialiased`}>
        
        {/* La Navbar gère maintenant sa propre visibilité */}
        <Navbar />

        {children}
      </body>
    </html>
  );
}