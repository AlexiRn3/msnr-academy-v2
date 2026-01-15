import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UserDashboard from "@/components/dashboard/UserDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // On récupère le profil complet pour connaître le rôle
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Si pas de profil (cas rare), on le considère comme user par défaut
  const role = profile?.role || "user";

  return (
    <>
      {role === "admin" ? (
        <AdminDashboard user={user} />
      ) : (
        <UserDashboard profile={profile} user={user} />
      )}
    </>
  );
}