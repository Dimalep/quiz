import { useState } from "react"
import type { Quiz } from "../../../models/Quiz"

export default function useQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  const addQuiz = async (addingQuiz: Quiz) => {
    try{
        const response = await fetch("http://localhost:8089/api/quizzes",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(addingQuiz),
        });

        if(!response) {
            throw new Error("Failed to add quiz!");
        }

        const createdQuiz: Quiz = await response.json();

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

  return {quizzes, setQuizzes, addQuiz}
}
