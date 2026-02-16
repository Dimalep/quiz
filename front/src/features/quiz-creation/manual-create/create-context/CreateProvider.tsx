import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Action, CreateState } from "./reducer";
import reducer from "./reducer";
import useQuizCreationService, {
  type QuestionDTO,
  type QuizDTO,
} from "../../../../core/hooks/quiz-creation-microservice/useQuizService";
import { useNavigate, useParams } from "react-router-dom";

interface CreateContextType {
  state: CreateState;
  dispatch: React.Dispatch<Action>;
  completeCreation: () => void;
  createQuestion: (questionType: string) => void;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export default function CreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { quizId } = useParams();
  const { createNewQuestion } = useQuizCreationService();
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
    if (!quizId) return;

    dispatch({
      type: "UPDATE_QUIZ_SETTINGS",
      payload: {
        data: {
          id: Number(quizId),
        },
      },
    });
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

  const completeCreation = () => {
    const quiz: QuizDTO = {
      title: state.quiz.title,
      description: state.quiz.description,
      quantityQuestions: state.quiz.questions.length,
    };
    // addQuiz(quiz);
    const quizId = 1;

    const questions: QuestionDTO[] = state.quiz.questions.map((q) => {
      return { title: q.text, type: q.type, quizId: quizId };
    });

    navigate("/quiz/complete-creation");
  };

  const createQuestion = async (questionType: string) => {
    const questionId = await createNewQuestion(Number(quizId), questionType);

    if (questionId === undefined) {
      console.log("Error get questionId");
      return;
    }

    dispatch({
      type: "CREATE_QUESTION",
      payload: { id: questionId, type: questionType },
    });
  };

  return (
    <CreateContext.Provider
      value={{
        state,
        dispatch,
        completeCreation,
        createQuestion,
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
