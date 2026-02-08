import React, { createContext, useContext, useEffect, useState } from "react";
import type { Answer, Quiz, Slide } from "../../../../core/dto/QuestionsDto";
import useQuiz from "./hooks/useQuiz";
import useSlide from "./hooks/useSlide";

interface CreateContextType {
  editorMode: "settings" | "slide";
  // answer
  updateAnswer: (answerNumber: number, text: string) => void;
  removeAnswer: (number: number) => void;
  addAnswer: () => void;
  // question
  updateQuestionTitle: (text: string) => void;
  createNewQuestion: () => void;
  // quiz
  quiz: Quiz;
  updateQuiz: (data: Partial<Quiz>) => void;
  // slide
  currentSlide?: Slide;
  openSlide: (value: number) => void;
  createSlide: (type: Slide["type"]) => void;
  removeSlide: () => void;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export default function CreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editorMode, setEditorMode] = useState<"settings" | "slide">("slide");

  const { quiz, setQuiz, updateQuiz } = useQuiz();
  const { currentSlide, setCurrentSlide, updateCurrentSlide } = useSlide();

  useEffect(() => {
    localStorage.setItem("quizDraft", JSON.stringify({ quiz, currentSlide }));
  }, [quiz, currentSlide]);

  const createNewQuestion = () => {
    if (!currentSlide) {
      console.log("Create new question slide error");
      return;
    }

    if (quiz.slides.length === currentSlide?.number) {
      setCurrentSlide(undefined);
    } else {
      setCurrentSlide(quiz.slides[currentSlide.number + 1]);
    }
  };

  //#region answer
  const updateAnswer = (answerNumber: number, text: string) => {
    setQuiz((prevQuiz) => {
      if (!prevQuiz || !currentSlide) return prevQuiz;

      return {
        ...prevQuiz,
        slides: prevQuiz.slides.map((slide) => {
          if (slide.number !== currentSlide.number) return slide;

          if (!slide.question) return slide;

          return {
            ...slide,
            isSaved: false,
            question: {
              ...slide.question,
              answers: slide.question.answers.map((a) =>
                a.number === answerNumber ? { ...a, text } : a,
              ),
            },
          };
        }),
      };
    });

    setCurrentSlide((prev) => {
      if (!prev || !prev.question) return prev;

      return {
        ...prev,
        isSaved: false,
        question: {
          ...prev.question,
          answers: prev.question.answers.map((a) =>
            a.number === answerNumber ? { ...a, text } : a,
          ),
        },
      };
    });
  };

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

  const addAnswer = () => {
    setCurrentSlide((prev) => {
      if (!prev) return prev;

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
  //#endregion

  //#region slide
  const updateQuestionTitle = (text: string) => {
    if (currentSlide) {
      const updatedSlides = quiz.slides.map((slide) =>
        slide.number === currentSlide.number
          ? {
              ...slide,
              isSaved: false,
              question: slide.question
                ? { ...slide.question, title: text }
                : slide.question,
            }
          : slide,
      );

      updateQuiz({ slides: updatedSlides });
      updateCurrentSlide({
        ...currentSlide,
        isSaved: false,
        question: currentSlide.question
          ? { ...currentSlide.question, title: text }
          : currentSlide.question,
      });
    }
  };

  const openSlide = (value: number) => {
    if (value === 0) {
      setEditorMode("settings");
      setCurrentSlide(undefined);
    } else {
      const slide = quiz.slides.find((s) => s.number === value);
      if (!slide) {
        console.log("Slide dont found");
        return;
      }
      setEditorMode("slide");
      setCurrentSlide({ ...slide });
    }
  };

  const createSlide = (type: Slide["type"]) => {
    const newSlide: Slide = {
      type,
      number: quiz.slides.length + 1,
      isSaved: false,
      question: {
        id: Date.now(),
        title: "Вопрос",
        answers: [
          { number: 1, isCorrectly: false, text: "" },
          { number: 2, isCorrectly: false, text: "" },
          { number: 3, isCorrectly: false, text: "" },
          { number: 4, isCorrectly: false, text: "" },
        ],
      },
    };

    updateQuiz({ slides: [...quiz.slides, newSlide] });
    setCurrentSlide(newSlide);

    return newSlide.number;
  };

  const removeSlide = () => {
    if (!currentSlide) return;

    const removedNumber = currentSlide.number;

    const filteredSlides = quiz.slides.filter(
      (slide) => slide.number !== removedNumber,
    );

    const renumberedSlides = filteredSlides.map((slide, index) => ({
      ...slide,
      number: index + 1,
    }));

    updateQuiz({ slides: renumberedSlides });

    const prevSlide =
      removedNumber > 1 ? renumberedSlides[removedNumber - 2] : undefined;

    setCurrentSlide(prevSlide);
  };

  //#endregion

  return (
    <CreateContext.Provider
      value={{
        editorMode,
        //
        updateAnswer,
        removeAnswer,
        addAnswer,
        //
        createNewQuestion,
        updateQuestionTitle,
        //
        quiz,
        updateQuiz,
        //
        currentSlide,
        openSlide,
        removeSlide,
        createSlide,
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
