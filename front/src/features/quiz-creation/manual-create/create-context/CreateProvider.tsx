import React, { createContext, useContext, useEffect, useState } from "react";
import type { Answer, Quiz, Slide } from "../../../../core/dto/QuestionsDto";
import useQuiz from "./hooks/useQuiz";
import useSlide from "./hooks/useSlide";

interface CreateContextType {
  quiz: Quiz;
  currentSlide?: Slide;
  editorMode: "settings" | "slide";

  removeAnswer: (number: number) => void;
  addAnswer: () => void;
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

  const { quiz, setQuiz, updateQuiz } = useQuiz();
  const { currentSlide, setCurrentSlide } = useSlide();

  const removeAnswer = (number: number) => {
    setCurrentSlide((prev) => {
      if (!prev?.question) return prev;

      const newAnswers = prev.question.answers.filter(
        (el) => el.number !== number,
      );

      return {
        ...prev,
        question: {
          ...prev.question,
          answers: newAnswers,
        },
      };
    });
  };

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

  useEffect(() => {
    localStorage.setItem("quizDraft", JSON.stringify({ quiz, currentSlide }));
  }, [quiz, currentSlide]);

  const startNewSlide = (type: Slide["type"]) => {
    const newSlide: Slide = {
      type,
      number: quiz.slides.length + 1,
      isSaved: false,
      question: {
        id: Date.now(),
        title: "",
        answers: [
          { number: 1, isCorrectly: false, text: "" },
          { number: 2, isCorrectly: false, text: "" },
          { number: 3, isCorrectly: false, text: "" },
          { number: 4, isCorrectly: false, text: "" },
        ],
      },
    };

    setCurrentSlide(newSlide);
    setQuiz((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));
    return newSlide.number;
  };

  const addAnswer = () => {
    setCurrentSlide((prev) => {
      if (!prev) return prev; // safety

      // если question вдруг undefined, создаём новый
      const question = prev.question ?? {
        id: Date.now(),
        title: "",
        answers: [],
      };

      const newAnswer: Answer = {
        number: question.answers.length + 1,
        text: "",
        isCorrectly: false,
      };

      return {
        ...prev,
        question: {
          ...question,
          answers: [...question.answers, newAnswer],
        },
      };
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
        removeAnswer,
        addAnswer,
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
