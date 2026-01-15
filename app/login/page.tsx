import { login } from "@/app/auth/actions";
import Link from "next/link";
import AuthLegal from "@/components/AuthLegal";

export default async function LoginPage(props: {
  searchParams: Promise<{ message?: string; warning?: string }>;
}) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Visuel Gauche (Inchangé) */}
      <div className="relative bg-neutral-900 hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden">
        <div className="z-10">
            <Link href="/" className="font-bold text-xl tracking-tight">MSNR<span className="text-red-600">.</span>ACADEMY</Link>
        </div>
        <div className="z-10">
            <h1 className="text-6xl font-bold mb-4 tracking-tighter">Welcome<br/>Back.</h1>
            <p className="text-neutral-400 max-w-sm">Log in to access your dashboard and premium content.</p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[1px] border-white/5 rounded-full z-0 pointer-events-none"></div>
      </div>

      {/* Formulaire Droit */}
      <div className="bg-white flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md flex flex-col min-h-[80vh] justify-center">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-black mb-2">Sign In</h2>
                <p className="text-neutral-500 text-sm">Enter your credentials to continue.</p>
            </div>

            {/* --- GESTION DES MESSAGES --- */}
            
            {/* Cas 1 : Erreur Rouge (Mauvais MDP) */}
            {searchParams?.message && (
              <div className="mb-6 p-4 bg-red-50 text-sm text-red-600 border-l-4 border-red-600 animate-in fade-in slide-in-from-top-2">
                <p className="font-bold">Error</p>
                {searchParams.message}
              </div>
            )}

            {/* Cas 2 : Warning Orange (Email non confirmé) */}
            {searchParams?.warning && (
              <div className="mb-6 p-4 bg-amber-50 text-sm text-amber-800 border-l-4 border-amber-500 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-lg">mail</span>
                    <p className="font-bold">Verification Required</p>
                </div>
                {searchParams.warning}
              </div>
            )}

            <form action={login} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500" htmlFor="email">Email</label>
                    <input 
                        className="w-full border-b border-neutral-300 py-3 text-lg text-black focus:outline-none focus:border-red-600 transition-colors bg-transparent placeholder-neutral-400" 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="trader@example.com" 
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500" htmlFor="password">Password</label>
                    <input 
                        className="w-full border-b border-neutral-300 py-3 text-lg text-black focus:outline-none focus:border-red-600 transition-colors bg-transparent placeholder-neutral-400" 
                        type="password" 
                        name="password" 
                        required 
                        placeholder="••••••••" 
                    />
                </div>

                <button className="w-full bg-red-600 text-white font-bold py-4 mt-4 hover:bg-red-700 transition-colors border border-transparent">
                    Log In
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-neutral-500 mb-8">
                Don't have an account? <Link href="/signup" className="text-black font-bold hover:text-red-600 transition-colors">Join the Academy</Link>
            </div>

            <AuthLegal />
        </div>
      </div>
    </div>
  );
}