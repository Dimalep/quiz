import { useState } from "react"
import type { Quiz } from "../models/Quiz"
import useSessionStorage from "./useSessionStorage"

export default function useQuiz() {
  const {addItemInSS} = useSessionStorage();

  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  const addQuiz = async (addingQuiz: Quiz) => {
    try{
        const response = await fetch("http://localhost:8089/api/quizzes/create",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(addingQuiz),
        });

        if(!response) {
            throw new Error("Failed to add quiz!");
        }

        const createdQuiz: Quiz = await response.json();

        
        if(createdQuiz?.id){
          addItemInSS("quizId", createdQuiz.id.toString());
          addItemInSS("quizTitle", createdQuiz.title.toString());
          addItemInSS("quizDescription", createdQuiz.description.toString());
        }

        setQuizzes((prev) => [...prev, createdQuiz]);
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  }

  const getAllQuizzes = async () => {
    try{
      const response = await fetch("http://localhost:8089/api/quizzes",{
        method: "GET",
        headers: {"Content-Type":"application/json"},
      });

      if(!response.ok) {
        throw new Error("Failed to fetch quizzes!");
      }

      const data: Quiz[] = await response.json();
      setQuizzes(data); 
    } catch (error){
      console.error("Error get quizzes", error);
    }
  }

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

  return {quizzes, setQuizzes, addQuiz, getAllQuizzes, getQuizById}
}
