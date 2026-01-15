import Link from "next/link";

export default function UserDashboard({ profile, user }: { profile: any, user: any }) {
  const userName = user.user_metadata.first_name || "Trader";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
            <h1 className="text-4xl font-bold tracking-tighter text-black mb-1">
                Welcome back, {userName}.
            </h1>
            <p className="text-neutral-500">Here is your market intelligence center.</p>
        </div>
        <div className="text-right hidden md:block">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-1">Current Plan</span>
            <span className="bg-red-50 text-red-700 px-3 py-1 rounded text-xs font-bold border border-red-100 uppercase">
                {profile?.subscription_status || "Free Member"}
            </span>
        </div>
      </div>

      {/* Stats Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-neutral-100 shadow-sm rounded-none">
            <div className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Progress</div>
            <div className="text-3xl font-black text-neutral-900">0%</div>
            <div className="w-full bg-neutral-100 h-1 mt-4">
                <div className="bg-red-600 h-1 w-0"></div>
            </div>
        </div>
        <div className="bg-white p-6 border border-neutral-100 shadow-sm rounded-none">
            <div className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Next Lesson</div>
            <div className="text-lg font-bold text-neutral-900 leading-tight">Introduction to MSNR Logic</div>
            <Link href="#" className="text-red-600 text-xs font-bold mt-4 block hover:underline">Start Learning →</Link>
        </div>
        <div className="bg-neutral-900 text-white p-6 shadow-sm rounded-none flex flex-col justify-between">
            <div className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Community</div>
            <div className="text-sm">Join the Discord to discuss today's setups.</div>
        </div>
      </div>

      {/* Liste des Cours */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Curriculum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Cours 1 */}
            <div className="group border border-neutral-200 bg-white hover:border-red-600 transition-colors cursor-pointer">
                <div className="h-40 bg-neutral-100 relative overflow-hidden">
                     {/* Image placeholder ou abstract */}
                     <div className="absolute inset-0 bg-neutral-200 group-hover:bg-neutral-300 transition-colors"></div>
                     <div className="absolute bottom-4 left-4 bg-white px-2 py-1 text-xs font-bold">FOUNDATION</div>
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">Logic Fundamentals</h3>
                    <p className="text-sm text-neutral-500 mb-4">Master the "Why" behind price movements using Line Charts.</p>
                    <span className="text-xs font-bold text-neutral-400 group-hover:text-red-600 transition-colors">CONTINUE →</span>
                </div>
            </div>

            {/* Card Cours 2 (Locked) */}
            <div className="group border border-neutral-200 bg-neutral-50 opacity-75">
                <div className="h-40 bg-neutral-200 relative flex items-center justify-center">
                     <span className="material-symbols-outlined text-4xl text-neutral-400">lock</span>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-neutral-700">SOP Strategy</h3>
                        <span className="text-[10px] uppercase bg-neutral-200 px-2 py-1 font-bold text-neutral-500">Pro</span>
                    </div>
                    <p className="text-sm text-neutral-500 mb-4">Advanced execution models and risk management.</p>
                    <Link href="/#pricing" className="text-xs font-bold text-red-600 hover:underline">UPGRADE TO ACCESS</Link>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}