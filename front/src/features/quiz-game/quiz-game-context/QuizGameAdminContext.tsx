import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Player } from "../../../core/hooks/quiz-game-microservice/usePlayer";
import type { GameDTO } from "../../../core/hooks/quiz-game-microservice/useGame";
import useGame from "../../../core/hooks/quiz-game-microservice/useGame";
import useQuizHubAdmin from "../../../core/hooks/quiz-game-microservice/useQuizHubAdmin";
import type { ProgressDTO } from "../../../core/hooks/quiz-game-microservice/useProgress";
import useQuizApi from "../../../core/hooks/quiz-creation-microservice/useQuizApi";

export interface QuizGameAdminContextType {
  sessionKey: string | undefined;
  players: Player[] | undefined;
  currentGame: GameDTO | undefined;
  progresses: ProgressDTO[];
  startGame: () => void;
  completeGame: () => void;
  closeForConnect: () => void;
  openForConnect: () => void;
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

  const { getQuizWithQuestionsIds } = useQuizApi();
  const { getGameBySessionKey } = useGame();
  const { sessionKey } = useParams<{ sessionKey: string }>();

  useEffect(() => {
    const data = localStorage.getItem("player");
    if (data === null) {
      console.log("player empty");
      return;
    }
    const player = JSON.parse(data);
    setCurrentPlayer(player);

    async function getCurrentQuizSession() {
      if (!sessionKey) return;
      const game = await getGameBySessionKey(sessionKey);
      setCurrentGame(game);
    }

    getCurrentQuizSession();
  }, []);

  const { connection, players, currentGame, setCurrentGame, progresses } =
    useQuizHubAdmin(sessionKey, currentPlayer ?? undefined);

  if (!currentPlayer) {
    return null;
  }

  const completeGame = async () => {
    if (connection === null) return;
    await connection.invoke("CompleteGame", sessionKey);
  };

  const startGame = async () => {
    if (connection === null) return;
    await connection.invoke("LaunchGame", sessionKey, 1.0);
  };

  const openForConnect = async () => {
    if (connection === null) return;
    await connection.invoke("OpenForConnect", sessionKey);
  };

  const closeForConnect = async () => {
    if (connection === null) return;
    await connection.invoke("CloseForConnect", sessionKey);
  };

  return (
    <AdminContext.Provider
      value={{
        sessionKey,
        players,
        startGame,
        completeGame,
        currentGame,
        progresses,
        openForConnect,
        closeForConnect,
      }}
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
