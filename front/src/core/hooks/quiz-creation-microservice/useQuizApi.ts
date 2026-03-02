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

  const getQuizWithQuestionsIds = async (quizId: number) : Promise<QuizWithQuestionsIds | undefined> => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}api/quizzes/with-questions-ids/${quizId}`, {
      method: "GET",
      headers: {"Content-type": "application/json"},
    });

    if(!response.ok){
      console.log("Error get quiz with questions ids");
      return undefined;
    }

    const data: QuizWithQuestionsIds = await response.json();
    return data;
  }

  const updateQuiz = async (quiz: QuizDTO) : Promise<boolean | undefined> => {
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

  const getQuizById = async (quizId: number) : Promise<QuizDTO | undefined> =>  {
    const response = await fetch(`http://localhost:5051/api/quizzes/${quizId}`, {
      method: "GET",
      headers: {"Content-type": "application/json"},
    });

    if(!response.ok){
      console.log("Error get quiz by id");
      return;
    }
    
    const data: QuizDTO = await response.json();

    return data;
  }

  const addQuiz = async (quiz: QuizDTO) : Promise<QuizDTO | undefined> => {
    const response = await fetch("", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(quiz)
    });

    if(!response.ok){
      console.log("Error add quiz");
      return;
    }

    const data: QuizDTO = await response.json();

    return data;
  }

  return {createNewQuiz, addQuiz, getQuizById, updateQuiz, getQuizWithQuestionsIds}
}
