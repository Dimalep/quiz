export type Answer = {
  index: number;
  text: string;
  isCorrectly: boolean;
}

export type Question = {
  index: number;
  text: string;
  type: string;
  answers: Answer[];
}

export type Quiz = {
  id: number;
  title: string;
  description: string;
  quantityQuestion: number;
  questions: Question[];
}

export interface CreateState {
  quiz: Quiz;
  currentQuestion: Question | undefined;
  editorMode: "settings" | "slide";
}

export type Action = 
  | {type: "UPDATE_ANSWER", payload: { answerIndex: number, data: Partial<Answer>}}
  | {type: "CREATE_ANSWER"}
  | {type: "DELETE_ANSWER", payload: {id: number}}
  | {type: "UPDATE_QUIZ", payload: {data: Partial<Quiz>}}
  | {type: "CREATE_QUESTION", payload: {type: string}}
  | {type: "OPEN_CHOSE"}
  | {type: "OPEN_NEXT_QUESTION"}
  | {type: "SELECT_QUESTION", payload: {index: number}}
  | {type: "OPEN_SETTINGS"}
  | {type: "DELETE_QUESTION"}
  | {type: "UPDATE_QUESTION", payload: {text: string}}


export default function reducer(state: CreateState, action: Action) {
  switch(action.type){
    //#region answer
    case ("UPDATE_ANSWER"): {
      if(state.currentQuestion === undefined) return state;
        const {answerIndex, data} = action.payload;
        const currentQustionIndex = state.currentQuestion?.index;

        return {
          ...state,
          quiz: {
            ...state.quiz,
            questions: state.quiz?.questions.map(q => q.index === currentQustionIndex ? {
              ...q,
              answers: q.answers.map(a => a.index === answerIndex ? {...a, ...data} : a )
            } : q)
          },
          currentQuestion: state.currentQuestion?.index === currentQustionIndex ? {
            ...state.currentQuestion,
            answers: state.currentQuestion.answers.map(a => a.index === answerIndex ? {...a, ...data} : a)
          } : state.currentQuestion
        };
    }
    case "DELETE_ANSWER": {
      const { id } = action.payload;

      if (!state.currentQuestion) return state;

      const currnetQuestionIndex = state.currentQuestion.index;

      const updatedQuestions = state.quiz.questions.map(q => {
        if (q.index !== currnetQuestionIndex) return q;

        const filteredAnswers = q.answers.filter(a => a.index !== id);

        const renumberedAnswers = filteredAnswers.map((a, index) => ({
          ...a,
          id: index + 1,
        }));

        return {
          ...q,
          answers: renumberedAnswers,
        };
      });

      const updatedCurrentQuestion = updatedQuestions.find(
        q => q.index === currnetQuestionIndex
      );

      return {
        ...state,
        quiz: {
          ...state.quiz,
          questions: updatedQuestions,
        },
        currentQuestion: updatedCurrentQuestion,
      };
    }
    case ("CREATE_ANSWER"):{
      if(!state.currentQuestion) return state;
      const currnetQuestionIndex = state.currentQuestion.index;
      
      const newAnswerIndex = state.currentQuestion.answers.length + 1; 

      const newAnswer: Answer = {
        index: newAnswerIndex,
        text: "",
        isCorrectly: false,
      }

      const updatedQuestions = state.quiz.questions.map(q => q.index === currnetQuestionIndex ?
        {
          ...q, answers: [...q.answers, newAnswer]
        } : q)
      return {
        ...state,
        quiz: {
          ...state.quiz,
          questions: updatedQuestions,
        },
        currentQuestion: {
          ...state.currentQuestion,
          answers: [...state.currentQuestion.answers, newAnswer],
        },
      };
    }
    //#endregion
    //quiz
    case ("UPDATE_QUIZ"):{
        const {data} = action.payload;
        return{
          ...state,
          quiz: {...state.quiz, ...data} 
        }
    }
    //question
    case ("CREATE_QUESTION"):{
        const length = state.quiz.questions.length;

        const {type} = action.payload;

        const newQuestion = {
          index: length + 1,
          text: "",
          type: type,
          answers: [{index: 1, text: "", isCorrectly: true}]
        }

        return{
          ...state,
          quiz: {
            ...state.quiz,
            questions: [...state.quiz.questions, newQuestion]
          },
          currentQuestion: newQuestion,
          editorMode: "slide" as "settings" | "slide",
        };
    }
    case ("OPEN_CHOSE"):{
        return {
          ...state,
          editorMode: "slide" as "settings" | "slide",
          currentQuestion: undefined
        }
    }
    case "OPEN_NEXT_QUESTION": {
        const currentIndex = state.quiz.questions.findIndex(
          q => q.index === state.currentQuestion?.index
        );

        const nextQuestion =
          currentIndex >= 0 && currentIndex < state.quiz.questions.length - 1
            ? state.quiz.questions[currentIndex + 1]
            : state.currentQuestion; 

        return {
          ...state,
          currentQuestion: nextQuestion,
          editorMode: "slide" as "settings" | "slide",
        };
    }
    case ("SELECT_QUESTION"):{
      const {index} = action.payload;
      return {
        ...state,
        currentQuestion: state.quiz.questions.find(q => q.index === index),
        editorMode: "slide" as "settings" | "slide"
      }
    }
    case ("OPEN_SETTINGS"):{
      return{
        ...state,
        currentQuestion: undefined,
        editorMode: "settings" as "settings" | "slide",
      }
    }
    case "DELETE_QUESTION": {
      if (!state.currentQuestion) throw Error("Error delete question");

      const currentNumber = state.currentQuestion.index;

      const newQuestions = state.quiz.questions.filter(
        q => q.index !== currentNumber
      );

      const renumberedQuestions = newQuestions.map((q, index) => ({
        ...q,
        number: index + 1,
      }));

      let nextQuestion: Question | undefined;
      if (renumberedQuestions.length === 0) {
        nextQuestion = undefined;
      } else if (currentNumber - 1 < renumberedQuestions.length) {
        nextQuestion = renumberedQuestions[currentNumber - 1]; 
      } else {
        nextQuestion = renumberedQuestions[renumberedQuestions.length - 1]; 
      }

      return {
        ...state,
        quiz: {
          ...state.quiz,
          questions: renumberedQuestions,
        },
        currentQuestion: nextQuestion,
      };
    }
    case "UPDATE_QUESTION": {
      if (!state.currentQuestion) return state;

      const { text } = action.payload;
      const currentIndex = state.currentQuestion.index;

      const updatedQuestions = state.quiz.questions.map(q =>
        q.index === currentIndex
          ? { ...q, text }
          : q
      );

      return {
        ...state,
        quiz: {
          ...state.quiz,
          questions: updatedQuestions,
        },
        currentQuestion: {
          ...state.currentQuestion,
          text,
        },
      };
    }
    default: return state
  }
}
