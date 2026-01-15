import { signup } from "@/app/auth/actions";
import Link from "next/link";
import AuthLegal from "@/components/AuthLegal";

// On ajoute 'confirm' au type des props
export default async function SignupPage(props: {
  searchParams: Promise<{ message: string; confirm?: string }>;
}) {
  const searchParams = await props.searchParams;
  const isConfirmationStep = searchParams.confirm === "true";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* GAUCHE : Visuel (Inchangé) */}
      <div className="relative bg-neutral-900 hidden lg:flex flex-col justify-between p-12 text-white overflow-hidden">
        <div className="z-10">
            <Link href="/" className="font-bold text-xl tracking-tight">MSNR<span className="text-red-600">.</span>ACADEMY</Link>
        </div>
        <div className="z-10">
            <h1 className="text-6xl font-bold mb-4 tracking-tighter">Start the<br/>Journey.</h1>
            <p className="text-neutral-400 max-w-sm">Join the community and master the logic of the markets.</p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[1px] border-white/5 rounded-full z-0 pointer-events-none"></div>
      </div>

      {/* DROITE : Zone dynamique */}
      <div className="bg-white flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md flex flex-col justify-center">
            
            {/* --- CAS 1 : MESSAGE DE CONFIRMATION --- */}
            {isConfirmationStep ? (
               <div className="text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                    <span className="material-symbols-outlined text-4xl">mark_email_unread</span>
                  </div>
                  <h2 className="text-3xl font-bold text-black mb-4">Check your inbox</h2>
                  <p className="text-neutral-600 mb-8 leading-relaxed">
                    We've sent a verification link to your email address.<br/>
                    Please click the link to activate your account.
                  </p>
                  
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded text-sm text-neutral-500 mb-8">
                    <span className="font-bold text-black">Tip:</span> If you don't see it, check your spam folder.
                  </div>

                  <Link 
                    href="/login" 
                    className="inline-block w-full bg-black text-white font-bold py-3 hover:bg-neutral-800 transition-colors"
                  >
                    Go to Login
                  </Link>
               </div>
            ) : (

            /* --- CAS 2 : LE FORMULAIRE (Inchangé) --- */
            <>
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-black mb-2">Create Account</h2>
                    <p className="text-neutral-500 text-sm">It takes less than a minute.</p>
                </div>

                {searchParams?.message && (
                  <div className="mb-6 p-4 bg-neutral-100 text-sm text-neutral-800 border-l-4 border-red-600">
                    {searchParams.message}
                  </div>
                )}

                <form action={signup} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500" htmlFor="first_name">First Name</label>
                            <input className="w-full border-b border-neutral-300 py-3 text-lg text-black focus:outline-none focus:border-red-600 transition-colors bg-transparent placeholder-neutral-400" name="first_name" type="text" required placeholder="John" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500" htmlFor="last_name">Last Name</label>
                            <input className="w-full border-b border-neutral-300 py-3 text-lg text-black focus:outline-none focus:border-red-600 transition-colors bg-transparent placeholder-neutral-400" name="last_name" type="text" required placeholder="Doe" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500" htmlFor="email">Email</label>
                        <input className="w-full border-b border-neutral-300 py-3 text-lg text-black focus:outline-none focus:border-red-600 transition-colors bg-transparent placeholder-neutral-400" name="email" type="email" required placeholder="trader@example.com" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500" htmlFor="password">Password</label>
                        <input className="w-full border-b border-neutral-300 py-3 text-lg text-black focus:outline-none focus:border-red-600 transition-colors bg-transparent placeholder-neutral-400" type="password" name="password" required placeholder="Create a strong password" />
                    </div>

                    <button className="w-full bg-red-600 text-white font-bold py-3 mt-2 hover:bg-red-700 transition-colors border border-transparent">
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-neutral-500 mb-6">
                    Already a member? <Link href="/login" className="text-black font-bold hover:text-red-600 transition-colors">Log in here</Link>
                </div>

                <AuthLegal />
            </>
            )}
            
        </div>
      </div>
    </div>
  );
}