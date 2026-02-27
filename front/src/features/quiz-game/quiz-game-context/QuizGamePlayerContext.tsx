import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Player } from "../../../core/hooks/quiz-game-microservice/usePlayer";
import type { GameDTO } from "../../../core/hooks/quiz-game-microservice/useGame";
import useQuizHubPlayer from "../../../core/hooks/quiz-game-microservice/useQuizHubPlayer";

interface QuizGamePlayerContextType {
  sessionKey: string | undefined;
  players: Player[] | undefined;
  currentGame: GameDTO | undefined;
  startGame: () => void;
}

const PlayerContext = createContext<QuizGamePlayerContextType | undefined>(
  undefined,
);

export default function QuizGamePlayerContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>();
  const { sessionKey } = useParams();

  useEffect(() => {
    const data = localStorage.getItem("player");
    if (data === null) return;
    const player = JSON.parse(data);
    setCurrentPlayer(player);

    const game = localStorage.getItem("currentGame");
    if (game === null) {
      console.log("Game is null");
      return;
    }
    setCurrentGame(JSON.parse(game));
  }, []);

  const startGame = async () => {
    await connection?.invoke("StartGame", sessionKey, currentPlayer?.id);
  };

  const { connection, players, currentGame, setCurrentGame } = useQuizHubPlayer(
    sessionKey,
    currentPlayer,
  );

  return (
    <PlayerContext.Provider
      value={{ sessionKey, players, currentGame, startGame }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const useQuizGamePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("useCreateContext err");
  }
  return context;
};
