import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import QuizPlayer from "@/components/course/QuizPlayer";

export default async function CoursePlayerPage(props: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ lesson?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // 1. Récupérer données
  const { data: course } = await supabase
    .from("courses")
    .select("*, lessons(*)")
    .eq("slug", params.slug)
    .single();

  // 2. Récupérer la progression
  const { data: progressData } = await supabase
    .from("user_progress")
    .select("lesson_id, is_completed")
    .eq("user_id", user?.id);
    
  // On transforme en Set pour recherche rapide
  const completedLessonIds = new Set(progressData?.filter(p => p.is_completed).map(p => p.lesson_id));

  const lessons = course?.lessons?.sort((a: any, b: any) => a.position - b.position) || [];
  
  // Leçon active
  const activeLessonSlug = searchParams.lesson;
  const activeLessonIndex = activeLessonSlug 
     ? lessons.findIndex((l: any) => l.slug === activeLessonSlug)
     : 0;
  
  const activeLesson = lessons[activeLessonIndex];
  
  // --- LOGIQUE DE VERROUILLAGE (N+1) ---
  // Pour voir leçon N, il faut avoir fini leçon N-1
  let isLocked = false;
  if (activeLessonIndex > 0) {
      const previousLessonId = lessons[activeLessonIndex - 1].id;
      if (!completedLessonIds.has(previousLessonId)) {
          isLocked = true;
      }
  }

  // Slug de la suivante pour le bouton "Next"
  const nextLessonSlug = lessons[activeLessonIndex + 1]?.slug || null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)]">
      
      {/* --- ZONE CONTENU --- */}
      <div className="flex-1 flex flex-col overflow-y-auto">
         {/* ... Header (Back link) ... */}
         
         {isLocked ? (
             <div className="flex-1 flex flex-col items-center justify-center bg-neutral-100 rounded-lg">
                 <span className="material-symbols-outlined text-6xl text-neutral-400 mb-4">lock</span>
                 <h2 className="text-xl font-bold mb-2">Lesson Locked</h2>
                 <p className="text-neutral-500">Please complete the previous lesson first.</p>
             </div>
         ) : (
             <>
                {/* VIDEO */}
                <div className="bg-black w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                     <iframe 
                        src={`https://www.youtube.com/embed/${activeLesson?.video_url}`} 
                        className="w-full h-full" 
                        allowFullScreen 
                     />
                </div>

                {/* DESCRIPTION & PDF */}
                <div className="mt-8 max-w-3xl">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold">{activeLesson?.title}</h1>
                        {activeLesson?.pdf_url && (
                            <a href={activeLesson.pdf_url} target="_blank" className="flex items-center gap-2 text-red-600 text-sm font-bold border border-red-100 bg-red-50 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-lg">download</span>
                                Download PDF
                            </a>
                        )}
                    </div>
                    
                    {/* Contenu Long (Markdown-like rendered as text for now, use a library like react-markdown for better result) */}
                    <div className="prose prose-neutral mb-12">
                        {activeLesson?.content ? activeLesson.content.split('\n').map((p:string, i:number) => <p key={i}>{p}</p>) : <p>{activeLesson?.description}</p>}
                    </div>

                    {/* QUIZ INTERFACE */}
                    <QuizPlayer 
                        lessonId={activeLesson?.id} 
                        quizData={activeLesson?.quiz_data} 
                        nextLessonSlug={nextLessonSlug}
                        courseSlug={course.slug}
                    />
                </div>
             </>
         )}
      </div>

      {/* --- SIDEBAR PROGRESSION --- */}
      <div className="w-full lg:w-80 flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden h-full">
         <div className="p-4 bg-neutral-900 text-white">
            <h2 className="font-bold text-sm uppercase tracking-wider text-neutral-400">Curriculum</h2>
         </div>
         <div className="overflow-y-auto flex-1 divide-y divide-neutral-100">
            {lessons.map((lesson: any, index: number) => {
                const isCompleted = completedLessonIds.has(lesson.id);
                const isActive = activeLesson?.id === lesson.id;
                // Verrouillé si précédent pas fini
                const isItemLocked = index > 0 && !completedLessonIds.has(lessons[index-1].id);

                return (
                    <Link 
                        key={lesson.id} 
                        href={isItemLocked ? '#' : `/dashboard/courses/${course.slug}?lesson=${lesson.slug}`}
                        className={`flex items-center gap-3 p-4 transition-colors ${
                            isActive ? "bg-red-50" : "hover:bg-neutral-50"
                        } ${isItemLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <div className="flex-shrink-0">
                            {isCompleted ? (
                                <span className="material-symbols-outlined text-green-600">check_circle</span>
                            ) : isItemLocked ? (
                                <span className="material-symbols-outlined text-neutral-300">lock</span>
                            ) : (
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${isActive ? 'border-red-600 text-red-600' : 'border-neutral-300 text-neutral-400'}`}>
                                    {index + 1}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className={`text-sm font-medium ${isActive ? "text-red-900" : "text-neutral-700"}`}>
                                {lesson.title}
                            </div>
                            <div className="text-[10px] text-neutral-400 mt-0.5">
                                {lesson.duration} min
                            </div>
                        </div>
                    </Link>
                )
            })}
         </div>
      </div>
    </div>
  );
}