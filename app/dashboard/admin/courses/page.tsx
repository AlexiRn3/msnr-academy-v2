import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminCoursesList() {
  const supabase = await createClient();
  const { data: courses } = await supabase.from("courses").select("*, lessons(count)").order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold">Course Management</h1>
         <Link href="/dashboard/admin/courses/new" className="bg-black text-white px-4 py-2 rounded font-bold text-sm">
            + New Course
         </Link>
       </div>
       
       <div className="bg-white border border-neutral-200 rounded">
          {courses?.map(course => (
             <div key={course.id} className="p-4 border-b border-neutral-100 flex justify-between items-center hover:bg-neutral-50">
                <div>
                    <div className="font-bold">{course.title}</div>
                    <div className="text-xs text-neutral-500">{course.lessons?.[0]?.count || 0} lessons • {course.is_published ? "Published" : "Draft"}</div>
                </div>
                <Link href={`/dashboard/admin/courses/${course.id}`} className="text-neutral-400 hover:text-black">
                    <span className="material-symbols-outlined">edit</span>
                </Link>
             </div>
          ))}
       </div>
    </div>
  );
}