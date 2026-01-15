import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  // 1. Récupérer le profil pour le rôle (Admin ou User)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // 2. Récupérer tous les cours publiés (triés par niveau pour la logique)
  // Assurez-vous d'avoir ajouté la colonne "level" dans votre table courses via SQL
  // Par défaut, si "level" est null, on considère que c'est niveau 1
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("level", { ascending: true }); // Important pour la logique 1 -> 2 -> 3

  // 3. Récupérer les achats de l'utilisateur
  const { data: purchases } = await supabase
    .from("purchases")
    .select("course_id")
    .eq("user_id", user.id);

  const purchasedCourseIds = new Set(purchases?.map((p) => p.course_id));

  // 4. Calculer le "Niveau Maximum Possédé"
  // Si j'ai acheté le cours de niveau 2, alors maxOwnedLevel = 2.
  let maxOwnedLevel = 0;
  courses?.forEach((course) => {
    // On suppose que course.level existe. Sinon on fallback à 1.
    const level = course.level || 1;
    if (purchasedCourseIds.has(course.id)) {
      if (level > maxOwnedLevel) maxOwnedLevel = level;
    }
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-6">
      
      {/* --- EN-TÊTE --- */}
      <div className="flex justify-between items-end border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-black">
            {isAdmin ? "Gestion des Cours" : "Mon Curriculum"}
          </h1>
          <p className="text-neutral-500">
            {isAdmin ? "Créez et gérez votre contenu." : "Maîtrisez la logique étape par étape."}
          </p>
        </div>
        
        {/* BOUTON ADMIN : CREATE NEW COURSE */}
        {isAdmin && (
            <Link 
                href="/dashboard/admin/courses/new" 
                className="bg-black text-white px-4 py-2 text-sm font-bold rounded hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">add</span>
                Ajouter un Cours
            </Link>
        )}
      </div>

      {/* --- LISTE DES COURS (GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => {
          const level = course.level || 1;
          const isOwned = purchasedCourseIds.has(course.id);
          
          // --- LOGIQUE D'ÉTAT ---
          let status = "locked"; // locked, buyable, access, included
          
          if (isAdmin) {
             status = "access"; // L'admin voit tout
          } else if (isOwned) {
            status = "access";
          } else if (level <= maxOwnedLevel) {
            status = "included"; // C'est un niveau inférieur à ce que j'ai déjà payé => Inclus
          } else if (level === maxOwnedLevel + 1) {
            status = "buyable"; // C'est le niveau juste après le mien => Je peux acheter
          } else if (maxOwnedLevel === 0 && level === 1) {
            status = "buyable"; // Je n'ai rien, je peux acheter le niveau 1
          }

          // Si c'est inclus, on donne l'accès direct
          const canAccess = status === "access" || status === "included";

          return (
            <div key={course.id} className="border rounded-lg p-4 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="aspect-video bg-neutral-100 rounded-md relative overflow-hidden flex items-center justify-center">
                {course.image_url ? (
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                    <span className="material-symbols-outlined text-4xl text-neutral-300">image</span>
                )}
                {/* Badge de statut */}
                <div className="absolute top-2 right-2">
                    {status === "included" && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Inclus</span>}
                    {status === "locked" && <span className="bg-neutral-200 text-neutral-600 text-xs px-2 py-1 rounded-full font-bold">Verrouillé</span>}
                </div>
              </div>
              
              {/* Contenu */}
              <div className="flex-1">
                <h2 className="font-bold text-xl mb-1">{course.title}</h2>
                <p className="text-sm text-neutral-500 line-clamp-2">{course.description}</p>
              </div>

              {/* Actions */}
              <div className="mt-auto pt-4 border-t border-neutral-100">
                {canAccess && (
                  <Link 
                    href={`/dashboard/courses/${course.slug}`}
                    className="w-full block text-center bg-black text-white hover:bg-neutral-800 py-2 rounded-md font-medium transition-colors"
                  >
                    Accéder au cours
                  </Link>
                )}

                {status === "buyable" && (
                  <Link 
                    href={`/checkout?course_id=${course.id}`} 
                    className="w-full block text-center bg-orange-600 text-white hover:bg-orange-700 py-2 rounded-md font-bold transition-colors"
                  >
                    Acheter - {course.price ? `${course.price}€` : "Premium"}
                  </Link>
                )}

                {status === "locked" && (
                  <button disabled className="w-full bg-neutral-100 text-neutral-400 py-2 rounded-md font-medium cursor-not-allowed flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    Terminez le niveau précédent
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}