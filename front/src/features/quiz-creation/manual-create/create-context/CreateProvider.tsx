import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import type { Action, CreateState } from "./reducer";
import reducer from "./reducer";
import { useNavigate, useParams } from "react-router-dom";
import useQuestion, {
  type QuestionDTO,
} from "../../../../core/hooks/quiz-creation-microservice/useQuestion";
import type { QuizDTO } from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import type { AnswerDTO } from "../../../../core/hooks/quiz-creation-microservice/useAnswer";
import useAnswer from "../../../../core/hooks/quiz-creation-microservice/useAnswer";
import useQuizApi from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";

interface CreateContextType {
  state: CreateState;
  dispatch: React.Dispatch<Action>;
  completeCreation: () => void;
  createQuestion: (questionType: string) => void;
  createAnswer: () => void;
}

const CreateContext = createContext<CreateContextType | undefined>(undefined);

export default function CreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [loadingCompleteCreation, setLoadingCompleteCreation] = useState(false);
  const { quizId } = useParams();

  //#region start data
  const saved = localStorage.getItem("quizDraft");
  const initialState = saved
    ? JSON.parse(saved)
    : {
        quiz: {
          id: Number(quizId),
          title: "",
          description: "",
          questions: [],
        },
        currentQuestion: undefined,
        editMode: "slide",
      };
  //#endregion

  const [state, dispatch] = useReducer(reducer, initialState);

  //#region services from back
  const { createNewQuestion, updateQuestionsBatch } = useQuestion();
  const { updateQuiz } = useQuizApi();
  const { updateAnswersBatch, addAnswer } = useAnswer();
  //#endregion

  useEffect(() => {
    if (state.quiz.id) return;

    dispatch({
      type: "UPDATE_QUIZ_SETTINGS",
      payload: {
        data: {
          id: Number(state.quiz.id),
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

  const completeCreation = async () => {
    console.log(`completing... ${state.quiz.id}`);
    // quiz
    const quiz: QuizDTO = {
      id: state.quiz.id,
      title: state.quiz.title,
      description: state.quiz.description,
      quantityQuestions: state.quiz.questions.length,
    };
    await updateQuiz(quiz);
    //const quizId = 1;

    // questions
    const questions: QuestionDTO[] = state.quiz.questions.map((q) => {
      return { id: q.id, title: q.text, type: q.type, quizId: q.quizId };
    });
    await updateQuestionsBatch(questions);

    //answers
    const answers: AnswerDTO[] = state.quiz.questions.flatMap((q) =>
      q.answers.map((a) => ({
        id: a.id,
        text: a.text,
        isCorrect: a.isCorrectly,
        questionId: a.questionId,
      })),
    );
    await updateAnswersBatch(answers);

    navigate(`/quiz/${state.quiz.id}/complete-creation`);
  };

  const createQuestion = async (questionType: string) => {
    const questionId = await createNewQuestion(state.quiz.id, questionType);

    if (questionId === undefined) {
      console.log("Error get questionId");
      return;
    }

    const answer: AnswerDTO | undefined = await addAnswer({
      text: "",
      questionId: questionId,
      isCorrect: true,
    });

    if (!answer) {
      console.log("Error add answer");
      return;
    }
    if (!answer.id) {
      console.log("Answer id cannot by undefined");
      return;
    }

    dispatch({
      type: "CREATE_QUESTION",
      payload: {
        questionId: questionId,
        type: questionType,
        answer: {
          id: answer.id,
          text: answer.text,
          isCorrectly: answer.isCorrect,
          questionId: answer.questionId,
        },
      },
    });
  };

  const createAnswer = async () => {
    if (state.currentQuestion === undefined) {
      console.log("Current question cannot by null");
      return;
    }

    const emptyAnswer: AnswerDTO = {
      text: "",
      isCorrect: false,
      questionId: state.currentQuestion?.id,
    };
    const answer = await addAnswer(emptyAnswer);

    if (!answer?.id) {
      console.log("Add answer error");
      return;
    }

    dispatch({ type: "CREATE_ANSWER", payload: { answerId: answer.id } });
  };

  return (
    <CreateContext.Provider
      value={{
        state,
        dispatch,
        completeCreation,
        createQuestion,
        createAnswer,
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
