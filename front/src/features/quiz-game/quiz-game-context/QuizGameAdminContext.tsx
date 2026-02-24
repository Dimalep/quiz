import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Player } from "../../../core/hooks/quiz-game-microservice/usePlayer";
import useQuizHub from "../../../core/hooks/quiz-game-microservice/useQuizHub";

export interface QuizGameAdminContextType {
  sessionKey: string | undefined;
  players: Player[] | undefined;
  gameStatus: "wait" | "play" | "complete";
  startGame: () => void;
}

const AdminContext = createContext<QuizGameAdminContextType | undefined>(
  undefined,
);

export default function QuizGameAdminContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>();
  const { sessionKey } = useParams<{ sessionKey: string }>();

  useEffect(() => {
    const data = localStorage.getItem("player");
    if (data === null) {
      console.log("player empty");
      return;
    }
    const player = JSON.parse(data);
    setCurrentPlayer(player);
  }, []);

  const { connection, players } = useQuizHub(sessionKey, currentPlayer);

  const [gameStatus, setGameStatus] = useState<"wait" | "play" | "complete">(
    "wait",
  );

  const startGame = () => {
    setGameStatus("play");
  };

  return (
    <AdminContext.Provider
      value={{ sessionKey, players, gameStatus, startGame }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useQuizGameAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw Error("Admin context is undefined");
  }
  return context;
};
