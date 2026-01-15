"use client";
import { useState } from "react";
import LessonEditor from "./LessonEditor";

export default function CourseEditorClient({ course, lessons }: any) {
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
        <div className="p-4 bg-neutral-50 border-b flex justify-between items-center">
            <h3 className="font-bold">Lessons Content</h3>
            <button onClick={() => { setEditingLesson(null); setIsModalOpen(true); }} className="text-xs bg-black text-white px-3 py-1 rounded">
                + Add Lesson
            </button>
        </div>

        <div className="divide-y">
            {lessons.map((lesson: any) => (
                <div key={lesson.id} className="p-4 flex justify-between items-center hover:bg-neutral-50">
                    <div className="flex gap-4 items-center">
                        <span className="font-mono text-neutral-400">#{lesson.position}</span>
                        <span className="font-medium">{lesson.title}</span>
                        {lesson.quiz_data?.length > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 rounded-full">Quiz</span>}
                    </div>
                    <button onClick={() => { setEditingLesson(lesson); setIsModalOpen(true); }} className="text-neutral-400 hover:text-black">
                        Edit
                    </button>
                </div>
            ))}
        </div>

        {isModalOpen && (
            <LessonEditor 
                courseId={course.id} 
                lesson={editingLesson} 
                onClose={() => { setIsModalOpen(false); window.location.reload(); }} // Reload brutal mais efficace pour voir les changements
            />
        )}
    </div>
  );
}