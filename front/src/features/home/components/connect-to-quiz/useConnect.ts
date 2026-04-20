import { useNavigate } from "react-router-dom";
import useGame from "../../../../core/api/quiz-game-service/useGame";

export default function useConnect() {
  const navigate = useNavigate();
  const {getGameBySessionKey} = useGame();

  const connectToQuiz = async (sessionKey: string) => {
    const game = await getGameBySessionKey(sessionKey.trim());
    if (game === undefined) {
      console.log("Quiz session by session key not exists");
      return;
    }

    console.log(game);
    if(game.status === "closed"){
      alert("Quiz closed for connection");
      return;
    }

    navigate(`/quiz/game/player/${game.key}`);
  };
  
  return {connectToQuiz}
}
