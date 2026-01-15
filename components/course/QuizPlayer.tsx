"use client";
import { useState } from "react";
import { completeLesson } from "@/app/dashboard/courses/actions";
import { useRouter } from "next/navigation";

export default function QuizPlayer({ lessonId, quizData, nextLessonSlug, courseSlug }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  if (!quizData || quizData.length === 0) {
      // Pas de quiz ? On valide directement via un bouton
      return (
          <div className="mt-8 p-6 bg-neutral-50 rounded text-center">
              <h3 className="font-bold mb-2">Lesson Completed?</h3>
              <button 
                onClick={async () => {
                    await completeLesson(lessonId, nextLessonSlug);
                    if(nextLessonSlug) router.push(`/dashboard/courses/${courseSlug}?lesson=${nextLessonSlug}`);
                    else router.refresh();
                }}
                className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-neutral-800 transition-colors"
              >
                  Mark as Complete & Continue
              </button>
          </div>
      );
  }

  const handleAnswer = (optionIndex: number) => {
      if (optionIndex === quizData[currentIndex].correct) {
          setScore(score + 1);
      }
      
      if (currentIndex + 1 < quizData.length) {
          setCurrentIndex(currentIndex + 1);
      } else {
          setShowResult(true);
      }
  };

  const passed = score === quizData.length; // Il faut tout bon pour passer (strict !)

  if (showResult) {
      return (
          <div className="mt-8 p-8 bg-neutral-50 rounded text-center animate-in zoom-in duration-300">
              {passed ? (
                  <>
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl">check</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Excellent!</h3>
                    <p className="text-neutral-500 mb-6">You've mastered this concept.</p>
                    <button 
                        onClick={async () => {
                            await completeLesson(lessonId, nextLessonSlug);
                            if(nextLessonSlug) router.push(`/dashboard/courses/${courseSlug}?lesson=${nextLessonSlug}`);
                            else router.refresh();
                        }}
                        className="bg-black text-white px-8 py-3 rounded font-bold"
                    >
                        Next Lesson →
                    </button>
                  </>
              ) : (
                  <>
                     <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Keep Trying</h3>
                    <p className="text-neutral-500 mb-6">You need 100% correct answers to proceed.</p>
                    <button onClick={() => { setCurrentIndex(0); setScore(0); setShowResult(false); }} className="text-black font-bold underline">
                        Retake Quiz
                    </button>
                  </>
              )}
          </div>
      )
  }

  return (
      <div className="mt-8 border border-neutral-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase text-red-600 tracking-widest">Knowledge Check</span>
              <span className="text-xs text-neutral-400">{currentIndex + 1} / {quizData.length}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-6">{quizData[currentIndex].question}</h3>
          
          <div className="space-y-3">
              {quizData[currentIndex].options.map((opt: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 border rounded hover:bg-neutral-50 hover:border-black transition-colors"
                  >
                      {opt}
                  </button>
              ))}
          </div>
      </div>
  );
}