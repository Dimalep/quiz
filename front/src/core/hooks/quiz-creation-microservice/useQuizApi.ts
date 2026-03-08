import type { Quiz } from "../../../features/quiz-creation/manual-create/create-context/reducer";

export type QuizDTO = {
    id?: number;
    title: string;
    description: string;
    quantityQuestions: number;
}

export interface QuizWithQuestionsIds {
  id: number,
  title: string;
  description: string;
  quantityQuestions: number;
  questionsIds: number[];
}

export default function useQuizApi() {

  const getQuizById = async (quizId: number) : Promise<Quiz | undefined> => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}api/quizzes/${quizId}`, {
      method: "GET",
      headers: {"Content-type": "application/json"}
    });

    if(!response.ok){
      console.log("Error get quiz by id");
      return undefined;
    }

    const data: Quiz = await response.json();

    return data;
  }

  const getShortQuizById = async (quizId: number) : Promise<QuizDTO | undefined>=> {
    const response = await fetch(`http://localhost:5051/api/quizzes/${quizId}`, {
      method: "GET",
      headers: {"Content-type": "application/json"},
    });
  
    if(!response.ok){
      console.log("Error update quiz");
      return;
    }
    
    const data: QuizDTO = await response.json();

    return data;
  };

  const updateQuiz = async (quiz: Quiz) : Promise<boolean | undefined> => {
    const response = await fetch("http://localhost:5051/api/quizzes", {
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(quiz)
    });
  
    if(!response.ok){
      console.log("Error update quiz");
      return;
    }
  
    return response.ok;
  }
  
  const createNewQuiz = async () : Promise<number | undefined> => {
    const response = await fetch("http://localhost:5051/api/quizzes/create_new_empty_quiz", {
      method: "POST",
      headers: {"Content-type":"application/json"}
    });
  
    if(!response.ok){
      console.log("Error create new quiz");
      return;
    }
  
    const quizId = await response.json();
    return quizId;
  }


  return {createNewQuiz, updateQuiz, getShortQuizById, getQuizById}
}
