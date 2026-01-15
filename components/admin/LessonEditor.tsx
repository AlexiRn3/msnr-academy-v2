"use client";
import { useState } from "react";
import { upsertLesson } from "@/app/dashboard/courses/actions";

export default function LessonEditor({ courseId, lesson = null, onClose }: any) {
  const [quizQuestions, setQuizQuestions] = useState<any[]>(lesson?.quiz_data || []);

  const addQuestion = () => {
    setQuizQuestions([...quizQuestions, { question: "", options: ["", ""], correct: 0 }]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...quizQuestions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuizQuestions(newQuestions);
  };
  
  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...quizQuestions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuizQuestions(newQuestions);
  }

  const handleSubmit = async (formData: FormData) => {
    // On passe le JSON via une closure ou un champ caché, ici directement à l'action
    await upsertLesson(formData, quizQuestions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">{lesson ? "Edit Lesson" : "New Lesson"}</h2>
        
        <form action={handleSubmit} className="space-y-6">
           <input type="hidden" name="courseId" value={courseId} />
           <input type="hidden" name="lessonId" value={lesson?.id || ""} />

           <div className="grid grid-cols-2 gap-4">
              <input name="title" placeholder="Lesson Title" defaultValue={lesson?.title} className="border p-2 rounded" required />
              <input name="duration" type="number" placeholder="Duration (min)" defaultValue={lesson?.duration} className="border p-2 rounded" />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <input name="video_url" placeholder="Video ID (Youtube)" defaultValue={lesson?.video_url} className="border p-2 rounded" />
              <input name="pdf_url" placeholder="PDF Download URL" defaultValue={lesson?.pdf_url} className="border p-2 rounded" />
           </div>
           
           <textarea name="description" placeholder="Short summary" defaultValue={lesson?.description} className="w-full border p-2 rounded h-20" />
           <textarea name="content" placeholder="Long content / Transcription (Markdown)" defaultValue={lesson?.content} className="w-full border p-2 rounded h-40 font-mono text-sm" />

           <div className="flex items-center gap-2">
              <label>Position:</label>
              <input name="position" type="number" defaultValue={lesson?.position || 1} className="border p-2 w-20 rounded" />
              
              <input name="is_free" type="checkbox" defaultChecked={lesson?.is_free} className="ml-4" />
              <label>Free Preview</label>
           </div>

           {/* --- QUIZ EDITOR --- */}
           <div className="border-t pt-6">
              <h3 className="font-bold mb-4 flex justify-between">
                 Quiz ({quizQuestions.length} questions)
                 <button type="button" onClick={addQuestion} className="text-xs bg-neutral-100 px-2 py-1 rounded">+ Add Question</button>
              </h3>
              
              <div className="space-y-6">
                {quizQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="bg-neutral-50 p-4 rounded border">
                        <input 
                            placeholder="Question text?" 
                            value={q.question} 
                            onChange={(e) => updateQuestion(qIdx, "question", e.target.value)}
                            className="w-full p-2 border mb-2"
                        />
                        <div className="grid grid-cols-2 gap-2 mb-2">
                           {q.options.map((opt: string, oIdx: number) => (
                               <div key={oIdx} className="flex gap-2">
                                  <input type="radio" name={`correct-${qIdx}`} checked={q.correct === oIdx} onChange={() => updateQuestion(qIdx, "correct", oIdx)} />
                                  <input value={opt} onChange={(e) => updateOption(qIdx, oIdx, e.target.value)} className="w-full p-1 border text-sm" placeholder={`Option ${oIdx+1}`} />
                               </div>
                           ))}
                        </div>
                        <button type="button" onClick={() => {
                             const newOpt = [...q.options, ""];
                             updateQuestion(qIdx, "options", newOpt);
                        }} className="text-xs text-blue-600 underline">Add Option</button>
                    </div>
                ))}
              </div>
           </div>

           <div className="flex justify-end gap-2 pt-4 border-t">
              <button type="button" onClick={onClose} className="px-4 py-2 text-neutral-500">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-black text-white rounded font-bold">Save Lesson</button>
           </div>
        </form>
      </div>
    </div>
  );
}