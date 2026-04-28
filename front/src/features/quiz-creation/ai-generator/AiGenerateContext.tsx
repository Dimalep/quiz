import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { GenerateState } from "./QuizReducer";
import quizReducer from "./QuizReducer";
import useAiGenerator from "../../../core/api/quiz-creation-service/useAiGenerator";

interface ContextType {
  state: GenerateState;
  dispatch: React.Dispatch<any>;

  generateByThemaHandler: () => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const initialQuizState: GenerateState = {
  currentQuestion: undefined,
  thema: "",
  quiz: {
    id: 0,
    userId: 0,
    title: "",
    description: "",
    quantityQuestions: 0,
    questions: [],
  },
  loading: false,
  error: null,
};

export default function AiGenerateContext({
  children,
}: {
  children: React.ReactNode;
}) {
  // LOAD QUIZ FROM LOCALSTORAGE
  function loadFromLocalStorage(): GenerateState | null {
    const data = localStorage.getItem("quizDraftAi");

    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  const [state, dispatch] = useReducer(
    quizReducer,
    undefined,
    () => loadFromLocalStorage() ?? initialQuizState,
  );

  const { generateByThema } = useAiGenerator();

  // AUTOSAVE
  useEffect(() => {
    localStorage.setItem("quizDraftAi", JSON.stringify(state));
    console.log("Current quiz draft: ", state.quiz);
  }, [state.quiz]);

  // GENERATE FULL QUIZ BY THEMA
  async function generateByThemaHandler() {
    dispatch({ type: "SET_LOADING", payload: true });
    const quiz = await generateByThema(state.thema);
    dispatch({ type: "SET_LOADING", payload: false });

    dispatch({ type: "SET_QUIZ", payload: quiz });

    console.log("Generated quiz: ", quiz);
  }

  return (
    <Context.Provider value={{ state, dispatch, generateByThemaHandler }}>
      {children}
    </Context.Provider>
  );
}

export const useGeneratorContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useCreateContext err");
  }
  return context;
};
