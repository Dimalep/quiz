import type { Question, Quiz } from "../manual-create/create-context/reducer";

export interface GenerateState {
  currentQuestion: Question | undefined;
  thema: string;
  quiz: Quiz;
  loading: boolean;
  error: string | null;
}

type GenerateAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_THEMA"; payload: string }
  | { type: "SET_QUIZ"; payload: Quiz }
  | { type: "SET_CURRENT_QUESTION"; payload: Question }
  | { type: "SET_CURRENT_QUESTION_TEXT"; payload: string }
  | { type: "SET_CURRENT_QUESTION_AS_NULL" }
  | { type: "SET_QUIZ_TITLE"; payload: string }
  | { type: "SET_QUIZ_DESCRIPTION"; payload: string }
  | { type: "SET_QUESTION_COMPLEXITY"; payload: number }
  | {
      type: "SET_ANSWER_TEXT";
      payload: { answerId: string; answerText: string };
    };

export default function quizReducer(
  state: GenerateState,
  action: GenerateAction,
) {
  switch (action.type) {
    case "SET_ANSWER_TEXT": {
      if (!state.currentQuestion) return state;

      const { answerId, answerText } = action.payload;

      return {
        ...state,
        currentQuestion: {
          ...state.currentQuestion,
          answers: state.currentQuestion.answers.map((a) =>
            a.id === answerId ? { ...a, text: answerText } : a,
          ),
        },
        quiz: {
          ...state.quiz,
          questions: state.quiz.questions.map((q) =>
            q.id === state.currentQuestion?.id
              ? {
                  ...q,
                  answers: q.answers.map((a) =>
                    a.id === answerId ? { ...a, text: answerText } : a,
                  ),
                }
              : q,
          ),
        },
      };
    }
    case "SET_QUESTION_COMPLEXITY": {
      if (!state.currentQuestion) return state;

      return {
        ...state,
        currentQuestion: {
          ...state.currentQuestion,
          complexity: action.payload,
        },
        quiz: {
          ...state.quiz,
          questions: state.quiz.questions.map((q) =>
            q.id === state.currentQuestion?.id
              ? { ...q, complexity: action.payload }
              : q,
          ),
        },
      };
    }
    case "SET_QUIZ_DESCRIPTION":
      return {
        ...state,
        quiz: {
          ...state.quiz,
          description: action.payload,
        },
      };
    case "SET_QUIZ_TITLE":
      return {
        ...state,
        quiz: {
          ...state.quiz,
          title: action.payload,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_THEMA":
      return {
        ...state,
        thema: action.payload,
      };
    case "SET_QUIZ":
      return {
        ...state,
        quiz: action.payload,
      };
    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case "SET_CURRENT_QUESTION_TEXT":
      if (!state.currentQuestion) return state;

      return {
        ...state,
        currentQuestion: {
          ...state.currentQuestion,
          text: action.payload,
        },
        quiz: {
          ...state.quiz,
          questions: state.quiz.questions.map((q) =>
            q.id === state.currentQuestion?.id
              ? { ...q, text: action.payload }
              : q,
          ),
        },
      };
    case "SET_CURRENT_QUESTION_AS_NULL":
      return {
        ...state,
        currentQuestion: undefined,
      };
  }
}
