import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signout } from "@/app/auth/actions";
import MinimalFooter from "@/components/MinimalFooter";
import SidebarNav from "@/components/dashboard/SidebarNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Vérif Auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  // 2. Vérif Rôle
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  // --- CONFIGURATION DES MENUS ---
  const userMenu = [
    { label: "Overview", icon: "dashboard", href: "/dashboard" },
    { label: "Courses", icon: "school", href: "/dashboard/courses" },
    { label: "Live Sessions", icon: "live_tv", href: "/dashboard/lives" },
    { label: "Resources", icon: "folder_open", href: "/dashboard/resources" },
    { label: "Community", icon: "forum", href: "https://discord.com", external: true },
    { label: "Settings", icon: "settings", href: "/dashboard/settings" },
  ];

  const adminMenu = [
    { label: "Console", icon: "admin_panel_settings", href: "/dashboard" },
    { label: "Users", icon: "group", href: "/dashboard/admin/users" },
    { 
      label: "Courses", 
      icon: "library_books", 
      href: "/dashboard/courses", 
      activePrefixes: ["/dashboard/admin/courses"]
    },
    { label: "Analytics", icon: "monitoring", href: "/dashboard/admin/analytics" },
    { label: "Settings", icon: "settings", href: "/dashboard/settings" },
  ];

  const menuItems = isAdmin ? adminMenu : userMenu;

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      
      {/* --- SIDEBAR GAUCHE (FIXE) --- */}
      <aside className="w-64 bg-neutral-900 text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-8">
            <Link href="/" className="font-bold text-xl tracking-tight">
                MSNR<span className="text-red-600">.</span>ACADEMY
            </Link>
            <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">
                {isAdmin ? "Admin Workspace" : "Student Area"}
            </p>
        </div>

        {/* Navigation via composant */}
        <SidebarNav menuItems={menuItems} />

        {/* Section User en bas de sidebar */}
        <div className="p-4 border-t border-white/10 mt-auto">
            <div className="flex items-center gap-3 mb-4 px-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isAdmin ? 'bg-white text-black' : 'bg-red-600 text-white'}`}>
                    {user.email?.[0].toUpperCase()}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate">
                        {profile?.full_name || 'Trader'}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate uppercase tracking-wider">
                        {profile?.role}
                    </p>
                </div>
            </div>
            <form action={signout}>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-neutral-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                </button>
            </form>
        </div>
      </aside>

      {/* --- ZONE DROITE (CONTENU + FOOTER) --- */}
      {/* flex-col et h-full pour gérer la hauteur totale */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-neutral-50 relative">
        
        {/* Header Mobile (Visible uniquement sur mobile) */}
        {/* Je l'ai sorti du scroll pour qu'il soit fixe en haut sur mobile aussi */}
        <div className="md:hidden p-4 bg-neutral-900 text-white flex justify-between items-center shrink-0 z-20">
            <span className="font-bold">MSNR.ACADEMY</span>
            <form action={signout}>
                <button><span className="material-symbols-outlined">logout</span></button>
            </form>
        </div>

        {/* CONTENU PRINCIPAL (SCROLLABLE) */}
        {/* overflow-y-auto ici permet au contenu de défiler indépendamment du footer */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
            <div className="p-4 md:p-8 max-w-7xl mx-auto">
                {children}
            </div>
        </main>

        {/* FOOTER (FIXE EN BAS) */}
        {/* En dehors du main, il ne scrolle pas */}
        <div className="shrink-0 border-t border-neutral-200 bg-white z-10">
            <MinimalFooter />
        </div>

      </div>
    </div>
  );
}