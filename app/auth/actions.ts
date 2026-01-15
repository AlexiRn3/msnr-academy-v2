"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return redirect("/login?warning=Veuillez confirmer votre email pour accéder à votre compte.");
    }

    return redirect("/login?message=Identifiants incorrects");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  // Récupération des nouveaux champs
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;

  // On crée le compte avec les métadonnées
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(), // Optionnel : utile pour l'affichage
      },
    },
  });

  if (error) {
    // AJOUTE CETTE LIGNE POUR VOIR L'ERREUR DANS TON TERMINAL
    console.error("Erreur Supabase:", error.message); 
    return redirect("/signup?message=Erreur lors de l'inscription");
  }

  return redirect("/signup?confirm=true");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}