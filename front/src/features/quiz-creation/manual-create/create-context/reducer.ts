export type Answer = {
  id: number;
  text: string;
  isCorrectly: boolean;
}

export type Question = {
  id: number;
  text: string;
  type: string;
  answers: Answer[];

  //for UI
  number: number;
}

export type Quiz = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface CreateState {
  quiz: Quiz;
  currentQuestion: Question | undefined;
  editorMode: "settings" | "slide";
}

export type Action = 
  | {type: "UPDATE_ANSWER", payload: { answerId: number, data: Partial<Answer>}}
  | {type: "CREATE_ANSWER"}
  | {type: "DELETE_ANSWER", payload: {id: number}}
  | {type: "UPDATE_QUIZ_SETTINGS", payload: {data: Partial<Quiz>}}
  | {type: "CREATE_QUESTION", payload: {type: string}}
  | {type: "OPEN_CHOSE"}
  | {type: "OPEN_NEXT_QUESTION"}
  | {type: "SELECT_QUESTION", payload: {number: number}}
  | {type: "OPEN_SETTINGS"}
  | {type: "DELETE_QUESTION"}
  | {type: "UPDATE_QUESTION", payload: {text: string}}


export default function reducer(state: CreateState, action: Action) {
  switch(action.type){
    //answer
    case ("UPDATE_ANSWER"): {
      if(state.currentQuestion === undefined) return state;
        const {answerId, data} = action.payload;
        const currentNumber = state.currentQuestion?.number;

        return {
          ...state,
          quiz: {
            ...state.quiz,
            questions: state.quiz?.questions.map(q => q.number === currentNumber ? {
              ...q,
              answers: q.answers.map(a => a.id === answerId ? {...a, ...data} : a )
            } : q)
          },
          currentQuestion: state.currentQuestion?.number === currentNumber ? {
            ...state.currentQuestion,
            answers: state.currentQuestion.answers.map(a => a.id === answerId ? {...a, ...data} : a)
          } : state.currentQuestion
        };
    }
    case "DELETE_ANSWER": {
      const { id } = action.payload;

      if (!state.currentQuestion) return state;

      const currentNumber = state.currentQuestion.number;

      const updatedQuestions = state.quiz.questions.map(q => {
        if (q.number !== currentNumber) return q;

        const filteredAnswers = q.answers.filter(a => a.id !== id);

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
        q => q.number === currentNumber
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
      const currentNumber = state.currentQuestion.number;
      const length = state.currentQuestion.answers.length;

      const newAnswer: Answer = {
        id: length+1,
        text: "",
        isCorrectly: false
      }

      const updatedQuestions = state.quiz.questions.map(q => q.number === currentNumber ?
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
    //quiz
    case ("UPDATE_QUIZ_SETTINGS"):{
        const {data} = action.payload;
        return{
          ...state,
          quiz: {...state.quiz, ...data} 
        }
    }
    //question
    case ("CREATE_QUESTION"):{
        const length = state.quiz.questions.length;
        const number = length === 0 ? 1 : length + 1;

        const {type} = action.payload;
        const newQuestion = {
          id: -1,
          text: "",
          type: type,
          number: number,
          answers: [{id: -1, text: "", isCorrectly: true}]
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
          q => q.number === state.currentQuestion?.number
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
      const {number} = action.payload;
      return {
        ...state,
        currentQuestion: state.quiz.questions.find(q => q.number === number),
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

      const currentNumber = state.currentQuestion.number;

      const newQuestions = state.quiz.questions.filter(
        q => q.number !== currentNumber
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
      const currentNumber = state.currentQuestion.number;

      const updatedQuestions = state.quiz.questions.map(q =>
        q.number === currentNumber
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
