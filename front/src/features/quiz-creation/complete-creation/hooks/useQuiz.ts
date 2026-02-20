import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { QuizDTO } from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import useQuizApi from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import useQuizSession from "../../../../core/hooks/quiz-game-microservice/useQuizSession";

export default function useQuiz() {
  const {quizId} = useParams();
  const [quiz, setQuiz] = useState<QuizDTO>();

  const {getQuizById} = useQuizApi();
  const {addQuizSession} = useQuizSession();
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) return;
      const data = await getQuizById(Number(quizId));
      setQuiz(data);
    };
    loadQuiz();
  }, [quizId]);

  const newQuizSession = async () => {
    console.log(Number(quizId));
    const quizSession = await addQuizSession(Number(quizId));

    navigate(`/quiz/game/${quizSession?.key}`);
  }

  return {getQuizById, quiz, newQuizSession}
}
