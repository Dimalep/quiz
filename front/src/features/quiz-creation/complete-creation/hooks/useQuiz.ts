import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { QuizDTO } from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import useQuizApi from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import useQuizSession from "../../../../core/hooks/quiz-game-microservice/useQuizSession";
import usePlayer from "../../../../core/hooks/quiz-game-microservice/usePlayer";

export default function useQuiz() {
  const {quizId} = useParams();
  const [quiz, setQuiz] = useState<QuizDTO>();

  const {getQuizById} = useQuizApi();
  const {addQuizSession} = useQuizSession();
  const {addPlayer} = usePlayer();
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
    // const player: Player = {
    //   id: 0,
    //   nickname: "",
    //   role: "admin"
    // }
    if(quizSession === undefined){
      console.log("Error add quiz session");
      return;
    }
    localStorage.setItem("quizSession", JSON.stringify(quizSession));

    const player = await addPlayer("admin", quizSession?.sessionKey);
    localStorage.setItem("player", JSON.stringify(player));

    navigate(`/quiz/game/${quizSession?.sessionKey}`);
  }

  return {getQuizById, quiz, newQuizSession}
}
