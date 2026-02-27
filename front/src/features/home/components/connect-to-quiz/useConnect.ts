import { useNavigate } from "react-router-dom";
import useGame from "../../../../core/hooks/quiz-game-microservice/useGame";
import usePlayer from "../../../../core/hooks/quiz-game-microservice/usePlayer";

export default function useConnect() {
  const navigate = useNavigate();
  const {getGameBySessionKey} = useGame();
  const {addPlayer} = usePlayer();

  const connectToQuiz = async (sessionKey: string) => {
    const data = await getGameBySessionKey(sessionKey);
    if (data === undefined) {
      console.log("Quiz session by session key not exists");
      return;
    }
    const player = await addPlayer("player", data.sessionKey);
    localStorage.setItem("player", JSON.stringify(player));

    navigate(`/quiz/game/${sessionKey}`);
  };
  
  return {connectToQuiz}
}
