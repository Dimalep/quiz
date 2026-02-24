export type QuizDTO = {
    id?: number;
    title: string;
    description: string;
    quantityQuestions: number;
}

export default function useQuizApi() {

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
  
    //const data: QuizDTO = await response.json(); 
  
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

  return {createNewQuiz, addQuiz, getQuizById, updateQuiz}
}
