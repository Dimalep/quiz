import { useEffect } from "react";
import { useQuizGamePlayerContext } from "../../../../quiz-game-context/QuizGamePlayerContext";

export default function GameRoomPlayer() {
  const { startGame } = useQuizGamePlayerContext();

  useEffect(() => {
    startGame();
  }, []);

  return <div>GameRoomPlayer</div>;
}
