import { useState } from 'react'
import type { QuestionSlide } from '../dto/QuestionsDto';

export default function useQuestoins() {
  const [questionsSlide, setQuestionsSlide] = useState<QuestionSlide[]>();
  const [currentQuestionSlide, setCurrentQuestionSlide] = useState<QuestionSlide>();
    

  return {questionsSlide, setQuestionsSlide, currentQuestionSlide, setCurrentQuestionSlide }
}
