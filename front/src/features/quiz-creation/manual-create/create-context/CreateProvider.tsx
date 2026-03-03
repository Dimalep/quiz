import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Action, CreateState, Quiz } from "./reducer";
import reducer from "./reducer";
import { useNavigate, useParams } from "react-router-dom";
import useQuizApi from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";

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
  const { updateQuiz, createNewQuiz } = useQuizApi();

  if (!quizId) return;

  const initialState: CreateState = {
    quiz: {
      id: Number(quizId),
      title: "",
      description: "",
      quantityQuestion: 0,
      questions: [],
    },
    currentQuestion: undefined,
    editorMode: "slide",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.quiz.id) return;

    const quiz = localStorage.getItem("quizDraft");
    if (quiz === null) {
      async function createQuiz() {
        const createdQuizId = await createNewQuiz();

        const data: Quiz = {
          id: Number(createdQuizId),
          title: "test",
          description: "description",
          quantityQuestion: 0,
          questions: [],
        };

        dispatch({
          type: "UPDATE_QUIZ",
          payload: {
            data: data,
          },
        });

        localStorage.setItem("quizDraft", JSON.stringify(data));
      }

      createQuiz();
    } else {
      dispatch({ type: "UPDATE_QUIZ", payload: { data: JSON.parse(quiz) } });
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

  const completeCreation = async () => {
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
