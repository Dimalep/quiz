import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Player } from "../../../core/hooks/quiz-game-microservice/usePlayer";
import useQuizHub from "../../../core/hooks/quiz-game-microservice/useQuizHub";

interface QuizGamePlayerContextType {
  sessionKey: string | undefined;
  players: Player[] | undefined;
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
  }, []);

  const { connection, players } = useQuizHub(sessionKey, currentPlayer);

  return (
    <PlayerContext.Provider value={{ sessionKey, players }}>
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
