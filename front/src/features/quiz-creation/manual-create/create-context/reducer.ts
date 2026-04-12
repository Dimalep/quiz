export type Answer = {
  id: string;
  index: number;
  text: string;
  isCorrect: boolean;
}

export type Question = {
  id: string;
  index: number;
  text: string;
  type: string;
  complexity: number;
  answers: Answer[];
}

export type Quiz = {
  id: number;
  title: string;
  description: string;
  userId: number;
  quantityQuestions: number;
  questions: Question[];
}

export interface CreateState {
  quiz: Quiz; 
  currentQuestion: Question | undefined;
  editorMode: string;
}

export type Action = 
  | {type: "UPDATE_ANSWER", payload: { answerIndex: number, data: Partial<Answer>}}
  | {type: "CREATE_ANSWER"}
  | {type: "DELETE_ANSWER", payload: {id: number}}
  | {type: "UPDATE_QUIZ", payload: {data: Partial<Quiz>}}
  | {type: "CREATE_QUESTION", payload: {type: string}}
  | {type: "OPEN_CHOSE"}
  | {type: "OPEN_NEXT_QUESTION"}
  | {type: "OPEN_PREV_QUESTION"}
  | {type: "SELECT_QUESTION", payload: {index: number}}
  | {type: "OPEN_SETTINGS"}
  | {type: "DELETE_QUESTION"}
  | {type: "UPDATE_QUESTION", payload: {text: string}}
  | {type: "CHANGE_QUESTION_COMPLEXITY", payload: {complexity: number}}
  | {type: "REMOVE_EMPTY_ANSWERS_FROM_QUESTION"}
  | {type: "REMOVE_EMPTY_QUESTION"}


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
          index: index + 1,
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
        id: crypto.randomUUID(),
        index: newAnswerIndex,
        text: "",
        isCorrect: false,
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
    case "REMOVE_EMPTY_QUESTION": {
      const clearedQuestions = state.quiz.questions.filter(
        q => q.text.trim() !== "" && q.answers.length > 0
      );

      // Опционально: перенумеровываем индексы вопросов
      const renumberedQuestions = clearedQuestions.map((q, index) => ({
        ...q,
        index: index + 1,
      }));

      return {
        ...state,
        quiz: {
          ...state.quiz,
          questions: renumberedQuestions
        },
        currentQuestion: renumberedQuestions[0] ?? undefined,
        editorMode: renumberedQuestions.length > 0 ? "slide" : "settings",
      };
    }
    //question
    case "CHANGE_QUESTION_COMPLEXITY": {
      const { complexity } = action.payload;

      if (!state.currentQuestion) return state;

      const currentQ = state.currentQuestion; 

      const updatedQuestion: Question = {
        ...currentQ,
        complexity,
      };

      return {
        ...state,
        currentQuestion: updatedQuestion,
        quiz: {
          ...state.quiz,
          questions: state.quiz.questions.map((q) =>
            q.id === currentQ.id ? updatedQuestion : q
          ),
        },
      };
    }
    case "REMOVE_EMPTY_ANSWERS_FROM_QUESTION": {
      if (!state.currentQuestion) return state;

      const clearedAnswers = state.currentQuestion.answers.filter(
        a => a.text.trim() !== "" || a.isCorrect === true
      );

      const renumberedAnswers = clearedAnswers.map((a, index) => ({
        ...a,
        index: index + 1,
      }));

      const updatedCurrentQuestion = {
        ...state.currentQuestion,
        answers: renumberedAnswers,
      };

      const updatedQuestions = state.quiz.questions.map(q =>
        q.index === state.currentQuestion!.index ? updatedCurrentQuestion : q
      );

      return {
        ...state,
        currentQuestion: updatedCurrentQuestion,
        quiz: {
          ...state.quiz,
          questions: updatedQuestions,
        },
      };
    }
    case ("CREATE_QUESTION"):{
        const length = state.quiz.questions.length;

        const {type} = action.payload;

        const newQuestion: Question = {
          id: crypto.randomUUID(),
          index: length + 1,
          text: "",
          type: type,
          complexity: 1,
          answers: [
            {
              id: crypto.randomUUID(),
              index: 1,
              text: "",
              isCorrect: true,
            }
          ]
        }

        return{
          ...state,
          quiz: {
            ...state.quiz,
            questions: [...state.quiz.questions, newQuestion]
          },
          currentQuestion: newQuestion,
          editorMode: "slide" 
        };
    }
    case ("OPEN_CHOSE"):{
        return {
          ...state,
          editorMode: "slide",
          currentQuestion: undefined
        }
    }
    case "OPEN_NEXT_QUESTION": {
        if(state.currentQuestion === undefined){
          const nextQuestion = state.quiz.questions[0];
          
          return {
            ...state,
            currentQuestion: nextQuestion,
            editorMode: "slide"
          }
        }

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
          editorMode: "slide"
        };
    }
    case "OPEN_PREV_QUESTION": {
      if(state.currentQuestion === undefined) return state;

      const currentIndex = state.currentQuestion.index;

      const prevQuestion = currentIndex - 1 === 0 
        ? undefined
        : state.quiz.questions.find(q => q.index === currentIndex - 1)

      if(prevQuestion){
        return{
          ...state,
          currentQuestion: prevQuestion,
          editorMode: "slide"
        }
      }else{
        return{
          ...state,
          currentQuestion: prevQuestion,
          editorMode: "settings" 
        }
      }
    }
    case ("SELECT_QUESTION"):{
      const {index} = action.payload;
      return {
        ...state,
        currentQuestion: state.quiz.questions.find(q => q.index === index),
        editorMode: "slide"
      }
    }
    case ("OPEN_SETTINGS"):{
      return{
        ...state,
        currentQuestion: undefined,
        editorMode: "settings"
      }
    }
    case "DELETE_QUESTION": {
      if (!state.currentQuestion) throw Error("Error delete question");

      const currentIndex = state.currentQuestion.index;

      // Убираем текущий вопрос
      const filteredQuestions = state.quiz.questions.filter(
        q => q.index !== currentIndex
      );

      // Перенумеровываем оставшиеся вопросы по index
      const renumberedQuestions = filteredQuestions.map((q, idx) => ({
        ...q,
        index: idx + 1,
      }));

      // Определяем, какой вопрос выбрать следующим
      let nextQuestion: Question | undefined;
      if (renumberedQuestions.length === 0) {
        nextQuestion = undefined;
      } else if (currentIndex - 1 < renumberedQuestions.length) {
        nextQuestion = renumberedQuestions[currentIndex - 1]; // берем следующий по позиции
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
        editorMode: nextQuestion ? "slide" : "settings",
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
