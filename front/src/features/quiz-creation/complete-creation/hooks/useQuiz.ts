import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuizApi from "../../../../core/hooks/quiz-creation-microservice/useQuizApi";
import useGame from "../../../../core/hooks/quiz-game-microservice/useGame";
import type { Quiz } from "../../manual-create/create-context/reducer";

export default function useQuiz() {
  const {quizId} = useParams();
  const [quiz, setQuiz] = useState<Quiz>();

  const {getQuizById} = useQuizApi();
  const {addGame} = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) return;
      const data = await getQuizById(Number(quizId));
      setQuiz(data);
    };
    loadQuiz();
  }, [quizId]);

  const saveAndGoToProfile = () => {
    navigate("/profile");
  };

  const newQuizSession = async () => {
    const quizSession = await addGame(Number(quizId));

    if(quizSession === undefined){
      console.log("Error add quiz session");
      return;
    }

    localStorage.setItem("quizSession", JSON.stringify(quizSession));

    navigate(`/quiz/game/admin/${quizSession?.sessionKey}`);
  }

  return {quiz, newQuizSession, saveAndGoToProfile}
}
