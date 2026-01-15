import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboard({ user }: { user: any }) {
  const supabase = await createClient();

  // Récupérer la liste des utilisateurs (On joint la table profiles pour le fun)
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-end border-b border-neutral-200 pb-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tighter text-black">Admin Console</h1>
            <p className="text-neutral-500">Platform overview and user management.</p>
        </div>
        <div className="bg-black text-white px-4 py-2 text-xs font-bold rounded">
            ADMIN MODE
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 border border-neutral-200">
            <div className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Total Users</div>
            <div className="text-4xl font-bold text-black mt-2">{profiles?.length || 0}</div>
        </div>
        <div className="bg-white p-6 border border-neutral-200">
            <div className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Premium</div>
            <div className="text-4xl font-bold text-red-600 mt-2">
                {profiles?.filter((p: any) => p.subscription_status === 'pro').length || 0}
            </div>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50">
            <h3 className="font-bold text-sm">Recent Signups</h3>
        </div>
        <table className="w-full text-left text-sm">
            <thead className="bg-white text-neutral-500 border-b border-neutral-100">
                <tr>
                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
                {profiles?.map((profile: any) => (
                    <tr key={profile.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-neutral-900">
                            {profile.email}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                profile.role === 'admin' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                                {profile.role}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`text-xs font-bold ${
                                profile.subscription_status === 'free' ? 'text-neutral-400' : 'text-red-600'
                            }`}>
                                {profile.subscription_status.toUpperCase()}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-400 text-xs">
                            {new Date(profile.created_at).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

    </div>
  );
}