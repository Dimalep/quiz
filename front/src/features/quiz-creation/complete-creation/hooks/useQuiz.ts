import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { QuizDTO } from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import useQuizApi from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";

export default function useQuiz() {
  const {quizId} = useParams();
  const [quiz, setQuiz] = useState<QuizDTO>();

  const {getQuizById} = useQuizApi();
 
  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) return;
      const data = await getQuizById(Number(quizId));
      setQuiz(data);
    };
    loadQuiz();
  }, [quizId]);

  return {getQuizById, quiz}
}
