import React, { createContext, useContext, useState } from "react";
import type { Quiz, Slide } from "../../../core/dto/QuestionsDto";

interface CreateContextType {
  quiz: Quiz;
  currentSlide?: Slide;

  startNewSlide: (type: Slide["type"]) => void;
  updateCurrentSlide: (data: Partial<Slide>) => void;
  saveCurrentSlide: () => void;
  removeSlide: (index: number) => void;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export default function CreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quiz, setQuiz] = useState<Quiz>({
    id: 0,
    title: "",
    description: "",
    slides: [],
  });

  const [currentSlide, setCurrentSlide] = useState<Slide>();

  const startNewSlide = (type: Slide["type"]) => {
    setCurrentSlide({
      type,
      number: quiz.slides.length + 1,
      isSaved: false,
    });
  };

  const updateCurrentSlide = (data: Partial<Slide>) => {
    setCurrentSlide((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const saveCurrentSlide = () => {
    if (!currentSlide) return;

    setQuiz((prev) => ({
      ...prev,
      slides: [...prev.slides, { ...currentSlide, isSaved: true }],
    }));

    setCurrentSlide(undefined);
  };

  const removeSlide = (index: number) => {
    setQuiz((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index),
    }));
  };

  return (
    <CreateContext.Provider
      value={{
        quiz,
        currentSlide,
        removeSlide,
        saveCurrentSlide,
        updateCurrentSlide,
        startNewSlide,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}

export const useCreateContext = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error("useCreateContext err");
  }
  return context;
};
