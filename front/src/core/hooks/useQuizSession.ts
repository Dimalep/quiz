import type { QuizSession } from "../models/QuizSesion";

export default function useQuizSession() {
  const createQuizSession = async (quizId: number, userId: number | null): Promise<QuizSession | null> => {
    try {
      const uri = userId != null ? `http://localhost:8089/api/quiz_sessions/create/${quizId}/${userId}` : `http://localhost:8089/api/quiz_sessions/create/${quizId}/anonymous` 

      const response = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: userId != null ? JSON.stringify({ quizId, userId }) : undefined,
      });

      if (!response.ok) throw new Error("Не удалось создать сессию квиза");

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // const connect = async (token: string) => {
  //   try{
  //     const response = await fetch("http://localhost:8089/api/quiz_sessions_users/add", {
  //       method: "POST",
  //       headers: {"Content-Type":"application/json"},
  //       body: JSON.stringify();
  //     })
  //   }catch(error){
  //     console.log("Error connecting to quiz: ", error);
  //   }
  // }

  return { createQuizSession };
}
