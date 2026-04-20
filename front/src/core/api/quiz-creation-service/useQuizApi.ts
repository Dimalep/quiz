import type { Quiz } from "../../../features/quiz-creation/manual-create/create-context/reducer";

// export type QuizDTO = {
//     id?: number;
//     title: string;
//     description: string;
//     quantityQuestions: number;
// }

// export interface QuizWithQuestionsIds {
//   id: number,
//   title: string;
//   description: string;
//   quantityQuestions: number;
//   questionsIds: number[];
// }

// export interface LightQuiz {
//   id: number,
//   title: string;
//   description: string;
//   quantityQuestions: number;
//   questionsIds: string[];
// }

export interface InfoAboutQuiz{
  id: number;
  title: string;
  description: string;
  quantityQuestions: number;
}

export default function useQuizApi() {

  const getInfoAboutQuizByQuizId = async (quizId: number) : Promise<InfoAboutQuiz| undefined> => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}api/quizzes/get-info-about-quiz/${quizId}`, {
      method: "GET",
      headers: {"Content-type": "application/json"}
    })

    if(!response.ok){
      console.log("Error get info about quiz.");
      return;
    }

    const data: InfoAboutQuiz = await response.json();
    return data;
  }

  const deleteQuizById = async (quizId: number) => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}api/quizzes/${quizId}`, {
      method: "DELETE",
      headers: {"Content-Type": "applcation/json"}
    });

    if(!response.ok){
      console.log("Error get quizzes by user id");
      return false;
    }

    return true;
  };

  const getQuizzesByUserId = async (userId: number) : Promise<Quiz[] | undefined> => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}api/quizzes/by-userid/${userId}`, {
      method: "GET",
      headers: {"Content-Type": "applcation/json"}
    });

    if(!response.ok){
      console.log("Error get quizzes by user id");
      return undefined;
    }

    const data = await response.json();
    return data;
  };

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
  
  const createNewQuiz = async (userId: number) : Promise<number | undefined> => {
    const response = await fetch(`http://localhost:5051/api/quizzes/create_new_empty_quiz/${userId}`, {
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


  return {createNewQuiz, updateQuiz, getQuizById, getQuizzesByUserId, deleteQuizById, getInfoAboutQuizByQuizId}
}

