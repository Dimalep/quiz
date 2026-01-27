import React, { createContext, useContext, useEffect, useState } from "react";
import type { Quiz, Slide } from "../../../core/dto/QuestionsDto";

interface CreateContextType {
  quiz: Quiz;
  currentSlide?: Slide;
  editorMode: "settings" | "slide";

  updateQuiz: (data: Partial<Quiz>) => void;
  openSlide: (value: number) => void;
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
  const [editorMode, setEditorMode] = useState<"settings" | "slide">("slide");

  const openSlide = (value: number) => {
    if (value === 0) {
      setEditorMode("settings");
      setCurrentSlide(undefined);
    } else {
      const slide = quiz.slides.find((s) => s.number === value);
      if (!slide) return;
      setEditorMode("slide");
      setCurrentSlide({ ...slide });
    }
  };

  const [quiz, setQuiz] = useState<Quiz>(() => {
    const saved = localStorage.getItem("quizDraft");
    return saved
      ? JSON.parse(saved).quiz
      : { id: 0, title: "", description: "", slides: [] };
  });

  const updateQuiz = (data: Partial<Quiz>) => {
    setQuiz((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const [currentSlide, setCurrentSlide] = useState<Slide | undefined>(() => {
    const saved = localStorage.getItem("quizDraft");
    return saved ? JSON.parse(saved).currentSlide : undefined;
  });

  useEffect(() => {
    localStorage.setItem("quizDraft", JSON.stringify({ quiz, currentSlide }));
  }, [quiz, currentSlide]);

  const startNewSlide = (type: Slide["type"]) => {
    const newSlide: Slide = {
      type,
      number: quiz.slides.length + 1,
      isSaved: false,
    };

    setCurrentSlide(newSlide);
    setQuiz((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));
    return newSlide.number;
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

  // const createNewQuiz = () => {
  //   setQuiz({ id: 0, title: "", description: "", slides: [] });
  //   setCurrentSlide(undefined);
  //   localStorage.removeItem("quizDraft"); // очищаем старый черновик
  // };

  return (
    <CreateContext.Provider
      value={{
        updateQuiz,
        editorMode,
        openSlide,
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
