import { useEffect, useState } from "react";
import useQuizService, { type Quiz } from "../../../../core/hooks/quiz-creation-microservice/useQuizService"

export default function useQuiz() {
  const [quiz, setQuiz] = useState<Quiz>();

  const {getQuizById} = useQuizService();
 
  useEffect(()=> {
    const loadQuiz = async () => {
        const data = await getQuizById(1);
        setQuiz(data);
    }
    loadQuiz();
  },[]);

  return {getQuizById, quiz}
}
