import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuizApi from "../../../../core/api/quiz-creation-service/useQuizApi";
import useGame from "../../../../core/api/quiz-game-service/useGame";
import type { Quiz } from "../../manual-create/create-context/reducer";

export default function useQuiz() {
  const {quizId} = useParams();
  const [quiz, setQuiz] = useState<Quiz>();

  const {getQuizById} = useQuizApi();
  const {addGame, initialGame} = useGame();
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

  //new
  const newGame = async () => {
    const game = await initialGame(Number(quizId));

    if(!game){
      console.log("Error initial game");
      return;
    }

    navigate(`/quiz/game/admin/${game.sessionKey}`);
  }

  return {quiz, newQuizSession, saveAndGoToProfile, newGame}
}
