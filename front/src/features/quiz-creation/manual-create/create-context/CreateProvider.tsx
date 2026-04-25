import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Action, CreateState, Quiz } from "./reducer";
import reducer from "./reducer";
import { useNavigate, useParams } from "react-router-dom";
import useQuizApi from "../../../../core/api/quiz-creation-service/useQuizApi";

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
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { updateQuiz } = useQuizApi();
  const rowUserId = localStorage.getItem("userId");

  if (!quizId) return null;

  const initialState: CreateState = {
    quiz: {
      id: Number(quizId),
      userId: Number(rowUserId),
      title: "",
      description: "",
      quantityQuestions: 0,
      questions: [],
    },
    currentQuestion: undefined,
    editorMode: "slide",
  };

  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const saved = localStorage.getItem("quizDraft");

    if (!saved) return initial;

    const parsed = JSON.parse(saved);

    return {
      ...initial,
      quiz: parsed.quiz,
      currentQuestion: parsed.currentQuestion,
    };
  });

  useEffect(() => {
    const quiz = localStorage.getItem("quizDraft");

    if (quiz === null || rowUserId === null) {
      async function createQuiz() {
        const data: Quiz = {
          id: Number(quizId),
          userId: Number(rowUserId),
          title: "test",
          description: "description",
          quantityQuestions: 0,
          questions: [],
        };

        dispatch({
          type: "UPDATE_QUIZ",
          payload: {
            data: data,
          },
        });

        localStorage.setItem(
          "quizDraft",
          JSON.stringify({
            quiz: data,
            currentQuestion: undefined,
          }),
        );
      }

      createQuiz();
    } else {
      dispatch({
        type: "UPDATE_QUIZ",
        payload: { data: JSON.parse(quiz).quiz },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quizDraft",
      JSON.stringify({
        quiz: state.quiz,
        currentQuestion: state.currentQuestion,
      }),
    );
  }, [state.quiz, state.currentQuestion]);

  const uploadFile = async (file: string) => {

  }

  const completeCreation = async () => {
    dispatch({ type: "REMOVE_EMPTY_QUESTION" });

    const res = await updateQuiz(state.quiz);
    if (!res) {
      console.log("Error cant update quiz");
      return;
    }
    navigate(`/quiz/${quizId}/complete-creation`);
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
