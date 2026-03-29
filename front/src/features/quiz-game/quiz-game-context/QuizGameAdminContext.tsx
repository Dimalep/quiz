import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Player } from "../../../core/hooks/quiz-game-microservice/usePlayer";
import type { GameDTO } from "../../../core/hooks/quiz-game-microservice/useGame";
import useGame from "../../../core/hooks/quiz-game-microservice/useGame";
import useQuizHubAdmin from "../../../core/hooks/quiz-game-microservice/useQuizHubAdmin";
import type { ProgressForAdmin } from "../../../core/hooks/quiz-game-microservice/useProgress";
import usePlayer from "../../../core/hooks/quiz-game-microservice/usePlayer";

export interface QuizGameAdminContextType {
  sessionKey: string | undefined;
  players: Player[] | undefined;
  currentGame: GameDTO | undefined;
  progresses: ProgressForAdmin[];
  startGame: () => void;
  completeGame: () => void;
  closeForConnect: () => void;
  openForConnect: () => void;
  restartGane: () => void;
  openGameResults: () => void;
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

  const { addPlayer } = usePlayer();
  const { getGameBySessionKey } = useGame();
  const { sessionKey } = useParams<{ sessionKey: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function launchPage() {
      if (!sessionKey) return;

      const createdPlayer = await addPlayer("admin", sessionKey);

      if (!createdPlayer) return;

      setCurrentPlayer(currentPlayer);
      localStorage.setItem("player", JSON.stringify(createdPlayer));
    }

    const data = localStorage.getItem("player");
    if (data === null) {
      launchPage();
      return;
    } else {
      const player = JSON.parse(data);
      setCurrentPlayer(player);
    }

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

  const openGameResults = () => {
    navigate(`game-result/${currentGame?.sessionKey}`);
  };

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

  const restartGane = async () => {
    if (connection === null) return;
    await connection.invoke("RestartGame", sessionKey);
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
        restartGane,
        openGameResults,
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
