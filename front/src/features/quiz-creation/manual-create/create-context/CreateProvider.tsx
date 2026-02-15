import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Action, CreateState } from "./reducer";
import reducer from "./reducer";

interface CreateContextType {
  state: CreateState;
  dispatch: React.Dispatch<Action>;
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

  useEffect(() => {
    localStorage.setItem(
      "quizDraft",
      JSON.stringify({
        quiz: state.quiz,
        currentQuestion: state.currentQuestion,
      }),
    );
  }, [state.quiz, state.currentQuestion]);

  return (
    <CreateContext.Provider
      value={{
        state,
        dispatch,
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
