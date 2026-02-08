import { useState } from "react";
import type { Slide } from "../../../../../core/dto/QuestionsDto";

export default function useSlide() {

  const [currentSlide, setCurrentSlide] = useState<Slide | undefined>(() => {
    const saved = localStorage.getItem("quizDraft");
    return saved ? JSON.parse(saved).currentSlide : undefined;
  });

  const updateCurrentSlide = (data: Partial<Slide>) => {
    setCurrentSlide(prev => (prev ? {...prev, ...data} : prev));
  };

  return {currentSlide, setCurrentSlide, updateCurrentSlide}
}
