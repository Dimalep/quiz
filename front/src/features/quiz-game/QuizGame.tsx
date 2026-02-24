import { useEffect, useState } from "react";
import type { Player } from "../../core/hooks/quiz-game-microservice/usePlayer";
import QuizGamePlayerContext from "./quiz-game-context/QuizGamePlayerContext";
import QuizGameAdminContext from "./quiz-game-context/QuizGameAdminContext";
import PlayerRoom from "./components/player-room/PlayerRoom";
import AdminRoom from "./components/admin-room/AdminRoom";

export default function QuizGame() {
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    const data = localStorage.getItem("player");
    if (data !== null) {
      const player = JSON.parse(data);
      setPlayer(player);
    }
  }, []);

  if (player?.role === "player") {
    return (
      <QuizGamePlayerContext>
        <PlayerRoom />
      </QuizGamePlayerContext>
    );
  } else {
    return (
      <QuizGameAdminContext>
        <AdminRoom />
      </QuizGameAdminContext>
    );
  }
}
