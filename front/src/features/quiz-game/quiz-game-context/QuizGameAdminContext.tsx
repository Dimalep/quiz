import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Player } from "../../../core/api/quiz-game-service/usePlayer";
import type { GameDTO } from "../../../core/api/quiz-game-service/useGame";
import useGame from "../../../core/api/quiz-game-service/useGame";
import useQuizHubAdmin from "../../../core/api/quiz-game-service/useQuizHubAdmin";
import type { ProgressForAdmin } from "../../../core/api/quiz-game-service/useProgress";
import usePlayer from "../../../core/api/quiz-game-service/usePlayer";
import useQuizApi, {
  type InfoAboutQuiz,
} from "../../../core/api/quiz-creation-service/useQuizApi";

export interface QuizGameAdminContextType {
  infoAbouQuiz: InfoAboutQuiz | undefined;
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
  const [infoAbouQuiz, setInfoAboutQuiz] = useState<InfoAboutQuiz>();

  const { getOrCreatePlayer } = usePlayer();
  const { getGameBySessionKey } = useGame();
  const { getInfoAboutQuizByQuizId } = useQuizApi();

  const { sessionKey } = useParams<{ sessionKey: string }>();

  const { connection, players, currentGame, setCurrentGame, progresses } =
    useQuizHubAdmin(sessionKey, currentPlayer);

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      if (!sessionKey) return;

      // Getting game
      const game = await getGameBySessionKey(sessionKey);
      if (!game) {
        console.log("Error get game");
        return;
      }

      setCurrentGame(game);
      console.log(game.id);

      // Getting player (admin)
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

  // Get info about quiz
  useEffect(() => {
    if (!currentGame) {
      console.log("Error get info about quiz. Curr");
      return;
    }

    (async () => {
      const infoFromBack = await getInfoAboutQuizByQuizId(currentGame.quizId);
      setInfoAboutQuiz(infoFromBack);
    })();
  }, [currentGame]);

  const openGameResults = () => {
    navigate(`/game-result/${currentGame?.key}`);
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
        infoAbouQuiz,
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
