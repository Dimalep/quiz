import { useState } from "react";
import type { Quiz } from "../../../../../core/dto/QuestionsDto";

export default function useQuiz() {

  const [quiz, setQuiz] = useState<Quiz>(() => {
    const saved = localStorage.getItem("quizDraft");
    return saved
      ? JSON.parse(saved).quiz
      : { id: 0, title: "", description: "", slides: [] };
  });

  const updateQuiz = (data: Partial<Quiz>) => {
    setQuiz((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return {quiz, setQuiz, updateQuiz }
}
