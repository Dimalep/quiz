import type { AnswerDTO } from "./useAnswer";

export type QuestionDTO = {
  id?: number;
  title: string;
  quizId: number;
  type: string;
}

export interface QuestionWithAnswers{
  questionId: number;
  title: string;
  type: string;
  answers: AnswerDTO[];
}

export default function useQuestion() {
  
  const getQuestionWithAnswers = async (questionId: number) : Promise<QuestionWithAnswers | undefined> => {
    const response = await fetch(`${import.meta.env.VITE_QUIZ_CREATION_ADDRESS}api/questions/with-answers/${questionId}`, {
      method: "GET",
      headers: {"Content-type":"application/json"}
    });

    if(!response.ok){
      console.log("Error getQuestionWithAnswers");
      return undefined;
    }

    const data = await response.json();
    return data;
  }; 

  const createNewQuestion = async (quizId: number, type: string) : Promise<number | undefined> => {
    const response = await fetch("http://localhost:5051/api/questions", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
          title: "",
          quizId: quizId,
          type: type
      })
    })
  
    if(!response.ok){
      console.log("Error create new question");
      return;
    }
  
    const question: QuestionDTO = await response.json();
    return question.id;
  }

  const updateQuestionsBatch = async (questions: QuestionDTO[]) : Promise<boolean> => {
    const response = await fetch("http://localhost:5051/api/questions/batch", {
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(questions)
    });
  
    if(!response.ok){
      console.log("Error update batch questions");
      return false;
    }
  
    return true;
  };

  return {createNewQuestion, updateQuestionsBatch, getQuestionWithAnswers}
}
