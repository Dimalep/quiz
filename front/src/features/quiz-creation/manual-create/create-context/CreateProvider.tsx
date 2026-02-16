import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Action, CreateState } from "./reducer";
import reducer from "./reducer";
import useQuizCreationService from "../../../../core/hooks/quiz-creation-microservice/useQuizService";
import { useNavigate } from "react-router-dom";

interface CreateContextType {
  state: CreateState;
  dispatch: React.Dispatch<Action>;
  completeCreation: () => void;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export default function CreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const saved = localStorage.getItem("quizDraft");
  const initialState = saved
    ? JSON.parse(saved)
    : {
        quiz: {
          id: 0,
          title: "",
          description: "",
          questions: [],
        },
        currentQuestion: undefined,
        editMode: "slide",
      };

  const [state, dispatch] = useReducer(reducer, initialState);
  //const { addQuiz } = useQuizCreationService();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "quizDraft",
      JSON.stringify({
        quiz: state.quiz,
        currentQuestion: state.currentQuestion,
      }),
    );
  }, [state.quiz, state.currentQuestion]);

  const completeCreation = () => {
    const quiz = {
      title: state.quiz.title,
      description: state.quiz.description,
    };
    // addQuiz(quiz);

    const questions = state.quiz.questions.map((q) => {
      return { text: q.text, type: q.type };
    });

    navigate("/quiz/complete-creation");
  };

  return (
    <CreateContext.Provider
      value={{
        state,
        dispatch,
        completeCreation,
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
