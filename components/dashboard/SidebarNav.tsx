"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  icon: string;
  href: string;
  external?: boolean;
  activePrefixes?: string[]; // AJOUT : Liste d'autres URLs qui activent ce bouton
};

export default function SidebarNav({ menuItems }: { menuItems: MenuItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-4 space-y-2">
      {menuItems.map((item) => {
        const isActive = 
          item.href === "/dashboard" 
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href) || 
              item.activePrefixes?.some(prefix => pathname.startsWith(prefix));

        return (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
              isActive
                ? "bg-white/10 text-white" 
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span
              className={`material-symbols-outlined ${
                item.label === "Community" ? "text-indigo-400" : ""
              } ${isActive ? "text-red-500" : ""}`}
            >
              {item.icon}
            </span>
            <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
            </span>
            {item.external && (
              <span className="material-symbols-outlined text-[10px] ml-auto opacity-50">
                open_in_new
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}