import { createClient } from "@/utils/supabase/server";
import { upsertCourse } from "@/app/dashboard/courses/actions";
import CourseEditorClient from "@/components/admin/CourseEditorClient"; // On va créer un wrapper client

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  // Si "new", on affiche form vide, sinon on fetch
  const isNew = id === 'new';
  let course = null;
  let lessons = [];

  if (!isNew) {
    const { data } = await supabase.from("courses").select("*, lessons(*)").eq("id", id).single();
    course = data;
    lessons = data?.lessons?.sort((a: any, b: any) => a.position - b.position) || [];
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
       <h1 className="text-3xl font-bold mb-8">{isNew ? "Create Course" : `Edit: ${course.title}`}</h1>
       
       {/* Formulaire Cours */}
       <form action={upsertCourse} className="bg-white p-6 border rounded-lg space-y-4 mb-8">
           <input type="hidden" name="courseId" value={isNew ? "" : course.id} />
           
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-neutral-500">Title</label>
                  <input name="title" defaultValue={course?.title} className="w-full border-b py-2 focus:outline-none focus:border-red-600" required />
              </div>
              <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-neutral-500">Intro Video ID</label>
                  <input name="intro_video_url" defaultValue={course?.intro_video_url} className="w-full border-b py-2 focus:outline-none focus:border-red-600" />
              </div>
           </div>

           <div className="space-y-1">
               <label className="text-xs font-bold uppercase text-neutral-500">Thumbnail URL</label>
               <input name="image_url" defaultValue={course?.image_url} className="w-full border-b py-2 focus:outline-none focus:border-red-600" />
           </div>

           <div className="space-y-1">
               <label className="text-xs font-bold uppercase text-neutral-500">Description</label>
               <textarea name="description" defaultValue={course?.description} className="w-full border p-2 h-24 rounded" />
           </div>

           <div className="flex items-center gap-2">
               <input type="checkbox" name="is_published" defaultChecked={course?.is_published} />
               <label className="text-sm">Publish Course</label>
           </div>
           
           <button className="bg-black text-white px-6 py-2 rounded font-bold text-sm">Save Course Details</button>
       </form>

       {/* Liste Leçons (Seulement si le cours existe) */}
       {!isNew && (
           <CourseEditorClient course={course} lessons={lessons} />
       )}
    </div>
  );
}