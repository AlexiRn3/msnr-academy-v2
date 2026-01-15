"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- GESTION COURS (ADMIN) ---

// Ancienne fonction createCourse (optionnelle si vous passez par le lien "New", mais je la laisse pour éviter l'erreur)
export async function createCourse() {
    const supabase = await createClient();
    
    // Vérification Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== 'admin') return;
  
    // On redirige vers la nouvelle page de création
    redirect("/dashboard/admin/courses/new");
}

export async function upsertCourse(formData: FormData) {
  const supabase = await createClient();
  
  // Vérif Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== 'admin') return;

  const courseId = formData.get("courseId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const intro_video_url = formData.get("intro_video_url") as string;
  const image_url = formData.get("image_url") as string;
  
  // Génération de slug simple
  const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Math.floor(Math.random() * 1000);

  const payload = {
    title,
    slug, // Attention : en prod, mieux vaut ne pas changer le slug lors d'un update pour le SEO
    description,
    intro_video_url,
    image_url,
    is_published: formData.get("is_published") === "on",
  };

  // Si c'est un update, on ne touche pas au slug pour ne pas casser les liens
  if (courseId) {
      delete (payload as any).slug; 
  }

  let error;
  
  if (courseId) {
    // UPDATE
    const result = await supabase.from("courses").update(payload).eq("id", courseId);
    error = result.error;
  } else {
    // INSERT
    const result = await supabase.from("courses").insert(payload);
    error = result.error;
  }

  if (error) {
    console.error(error);
    return { error: "Erreur lors de la sauvegarde" };
  }

  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/admin/courses");
  
  if (!courseId) {
     redirect("/dashboard/admin/courses");
  }
}

export async function deleteCourse(formData: FormData) {
  const supabase = await createClient();
  
  // Vérif Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== 'admin') return;

  const courseId = formData.get("courseId") as string;

  await supabase.from("courses").delete().eq("id", courseId);
  
  revalidatePath("/dashboard/courses");
  revalidatePath("/dashboard/admin/courses");
}

// --- GESTION LEÇONS (ADMIN) ---

export async function upsertLesson(formData: FormData, quizData: any) {
    const supabase = await createClient();
    
    // Vérif Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== 'admin') return;
    
    const lessonId = formData.get("lessonId") as string;
    const courseId = formData.get("courseId") as string;
    
    const title = formData.get("title") as string;
    // Génération slug
    const slug = title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Math.floor(Math.random() * 1000);

    const payload = {
        course_id: courseId,
        title: title,
        slug: slug, 
        description: formData.get("description"),
        content: formData.get("content"),
        video_url: formData.get("video_url"),
        pdf_url: formData.get("pdf_url"),
        duration: parseInt(formData.get("duration") as string) || 0,
        position: parseInt(formData.get("position") as string) || 0,
        is_free: formData.get("is_free") === "on",
        quiz_data: quizData 
    };

    if (lessonId) {
        delete (payload as any).slug; // On garde le slug original en update
        await supabase.from("lessons").update(payload).eq("id", lessonId);
    } else {
        await supabase.from("lessons").insert(payload);
    }

    revalidatePath(`/dashboard/admin/courses`);
}

// --- GESTION PROGRESSION (USER) ---

export async function completeLesson(lessonId: string, nextLessonSlug: string | null) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 1. Marquer comme terminé
    await supabase.from("user_progress").upsert({
        user_id: user.id,
        lesson_id: lessonId,
        is_completed: true
    }, { onConflict: 'user_id, lesson_id' });

    revalidatePath("/dashboard/courses");
    
    return { success: true };
}