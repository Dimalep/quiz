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

  const { getOrCreatePlayer } = usePlayer();
  const { getGameBySessionKey } = useGame();
  const { sessionKey } = useParams<{ sessionKey: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      if (!sessionKey) return;

      const game = await getGameBySessionKey(sessionKey);
      if (!game) {
        console.log("Error get game");
        return;
      }

      setCurrentGame(game);
      console.log(game.id);

      const player = await getOrCreatePlayer(game.id, "admin");
      console.log("Current player: ", player);

      if (!player) {
        console.log("Игрок не создан");
        return;
      }

      setCurrentPlayer(player);
      localStorage.setItem("currentPlayer", JSON.stringify(player));
    }

    init();
  }, [sessionKey]);

  const { connection, players, currentGame, setCurrentGame, progresses } =
    useQuizHubAdmin(sessionKey, currentPlayer);

  const openGameResults = () => {
    navigate(`/game-result/${currentGame?.sessionKey}`);
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
