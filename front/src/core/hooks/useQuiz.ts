import { useState } from "react"
import type { Quiz } from "../models/Quiz"
import useSessionStorage from "./useSessionStorage"
import type { QuizDto } from "../models/QuizDto";
//ALL REMAKE 
export default function useQuiz() {
  const {setItemInSS} = useSessionStorage();
  const [currentQuiz, setCurrentQuiz] = useState<QuizDto>({id: -1, questions: []});

  const [quizzes, setQuizzes] = useState<QuizDto[]>([{
    id: 1,
    title: "TEST1",
    description: "decsription 1",
    tag: "default",
    questions: []
  },]);


  const addQuiz = (): QuizDto => {
    try{
      //get id new quiz from back
      const newQuiz = {id: Date.now(), questions: []};
      setCurrentQuiz(newQuiz);
      console.log("Current quizId = ", newQuiz.id);
      return newQuiz;
    }catch(err){
      console.log("Error add quiz: " , err);
      return currentQuiz;
    }
  };

  const getAllQuizzes = async () => {
    // try{
    //   const response = await fetch("http://localhost:8089/api/quizzes",{
    //     method: "GET",
    //     headers: {"Content-Type":"application/json"},
    //   });

    //   if(!response.ok) {
    //     throw new Error("Failed to fetch quizzes!");
    //   }

    //   const data: Quiz[] = await response.json();
    //   setQuizzes(data); 
    // } catch (error){
    //   console.error("Error get quizzes", error);
    // }
  };

  const getQuizById = async (quizId: number): Promise<Quiz | null> => {
    try{
      const response = await fetch(`http://localhost:8089/api/quizzes/${quizId}`, {
        method: "GET",
        headers: {"Content-Type":"application/json"},
      });

      if(!response.ok) {
        throw new Error("Failed to fetch quizzes!");
      }

      const data: Quiz = await response.json();
      return data;
    }catch(error){
      console.error("Error get quizz", error);
      return null;
    }
  }

  return {quizzes, setQuizzes, addQuiz, getAllQuizzes, getQuizById, currentQuiz, setCurrentQuiz}
}
