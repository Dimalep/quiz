import { useNavigate } from "react-router-dom";
import useGame from "../../../../core/hooks/quiz-game-microservice/useGame";

export default function useConnect() {
  const navigate = useNavigate();
  const {getGameBySessionKey} = useGame();

  const connectToQuiz = async (sessionKey: string) => {
    const data = await getGameBySessionKey(sessionKey.trim());
    if (data === undefined) {
      console.log("Quiz session by session key not exists");
      return;
    }

    navigate(`/quiz/game/player/${sessionKey.trim()}`);
  };
  
  return {connectToQuiz}
}
