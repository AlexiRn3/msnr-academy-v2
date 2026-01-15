import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { deleteCourse } from "./actions"; // On garde deleteCourse ici

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Récupérer le rôle
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // 2. Récupérer les cours
  // Si admin : tout voir. Si user : voir seulement les publiés.
  let query = supabase.from("courses").select("*, lessons(count)").order("created_at", { ascending: false });
  
  if (!isAdmin) {
    query = query.eq("is_published", true);
  }

  const { data: courses } = await query;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* --- EN-TÊTE --- */}
      <div className="flex justify-between items-end border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-black">
            {isAdmin ? "Course Management" : "My Curriculum"}
          </h1>
          <p className="text-neutral-500">
            {isAdmin ? "Create, edit and manage your content." : "Master the logic step by step."}
          </p>
        </div>
        
        {/* BOUTON ADMIN : CREATE NEW COURSE */}
        {isAdmin && (
            <Link 
                href="/dashboard/admin/courses/new" 
                className="bg-black text-white px-4 py-2 text-sm font-bold rounded hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">add</span>
                Add Course
            </Link>
        )}
      </div>

      {/* --- VUE ADMIN : TABLEAU DE GESTION --- */}
      {isAdmin ? (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-3 font-medium text-xs uppercase">Course Title</th>
                <th className="px-6 py-3 font-medium text-xs uppercase">Status</th>
                <th className="px-6 py-3 font-medium text-xs uppercase">Content</th>
                <th className="px-6 py-3 font-medium text-xs uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {courses?.map((course) => (
                <tr key={course.id} className="hover:bg-neutral-50 group">
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    {course.title}
                    <div className="text-xs text-neutral-400 font-mono mt-1">/{course.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      course.is_published 
                        ? "bg-green-100 text-green-700" 
                        : "bg-neutral-100 text-neutral-500"
                    }`}>
                      {course.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {course.lessons?.[0]?.count || 0} lessons
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    
                    {/* 1. VIEW (User view) */}
                    <Link href={`/dashboard/courses/${course.slug}`} className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-200 rounded transition-colors" title="Preview as Student">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                    </Link>

                    {/* 2. EDIT (Admin view) - AJOUTÉ ICI */}
                    <Link href={`/dashboard/admin/courses/${course.id}`} className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit Content">
                        <span className="material-symbols-outlined text-lg">edit_square</span>
                    </Link>
                    
                    {/* 3. DELETE */}
                    <form action={deleteCourse}>
                        <input type="hidden" name="courseId" value={course.id} />
                        <button className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete Course">
                            <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </form>
                  </td>
                </tr>
              ))}
              {courses?.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">No courses yet. Click "Add Course" to start.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        
      /* --- VUE USER : GRILLE DES COURS (Inchangée) --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
                <Link key={course.id} href={`/dashboard/courses/${course.slug}`} className="group block h-full">
                    <div className="border border-neutral-200 bg-white h-full hover:border-red-600 hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div className="h-48 bg-neutral-100 relative overflow-hidden flex items-center justify-center">
                            {course.image_url ? (
                                <img src={course.image_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <span className="material-symbols-outlined text-4xl text-neutral-300 group-hover:text-red-500 transition-colors">school</span>
                            )}
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold mb-2 text-neutral-900 group-hover:text-red-600 transition-colors">
                                {course.title}
                            </h3>
                            <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                                {course.description || "Master the logic behind the charts."}
                            </p>
                            
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100">
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    {course.lessons?.[0]?.count || 0} Lessons
                                </span>
                                <span className="text-xs font-bold text-black flex items-center gap-1 group-hover:gap-2 transition-all">
                                    START WATCHING <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      )}
    </div>
  );
}