import { useState } from "react";
import type { Quiz } from "../dto/QuestionsDto";

export default function useCreate() {
  // -> useQuiz
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>(); 
  //
  // -> useQuestion
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  //

  return {currentQuiz, setCurrentQuiz, currentQuestionId, setCurrentQuestionId}
}
