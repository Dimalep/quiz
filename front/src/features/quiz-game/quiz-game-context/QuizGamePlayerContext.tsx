import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Player } from "../../../core/api/quiz-game-service/usePlayer";
import type { GameDTO } from "../../../core/api/quiz-game-service/useGame";
import useQuizHubPlayer from "../../../core/api/quiz-game-service/useQuizHubPlayer";
import useQuizApi, {
  type InfoAboutQuiz,
} from "../../../core/api/quiz-creation-service/useQuizApi";
import type {
  AnswerResult,
  PlayerProgress,
} from "../../../core/api/quiz-game-service/useProgress";
import type { Question } from "../../quiz-creation/manual-create/create-context/reducer";
import usePlayer from "../../../core/api/quiz-game-service/usePlayer";
import useGame from "../../../core/api/quiz-game-service/useGame";

interface QuizGamePlayerContextType {
  answerHistory: AnswerHistory[];
  toAnsweredLoading: boolean;
  isEdit: boolean;
  infoAboutQuiz: InfoAboutQuiz | undefined;
  curQuestion: Question | undefined;
  toAnswer: (answerId: string[]) => void;
  sessionKey: string | undefined;
  players: Player[] | undefined;
  currentGame: GameDTO | undefined;
  currentProgress: PlayerProgress | undefined;
  currentPlayer: Player | undefined;
  // actualProgress: ActualProgress;
  startGame: () => void;
  selectCurrentQuestion: (questionId: string) => void;
  finishGame: () => void;
  changeName: (name: string) => void;
  setIsEdit: (value: boolean) => void;
  setAnswerHistory: (value: AnswerHistory[]) => void;
}

//#region
export interface AnswerHistory {
  questionId: string;
  answerId: string[];
}
//#endregion

const PlayerContext = createContext<QuizGamePlayerContextType | undefined>(
  undefined,
);

export default function QuizGamePlayerContext({
  children,
}: {
  children: React.ReactNode;
}) {
  // any stats
  const [isEdit, setIsEdit] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>();
  const [infoAboutQuiz, setInfoAboutQuiz] = useState<InfoAboutQuiz | undefined>(
    undefined,
  );
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>(() => {
    const stored = localStorage.getItem("answerHistory");
    return stored ? JSON.parse(stored) : [];
  });

  const { getInfoAboutQuizByQuizId } = useQuizApi();
  const { getOrCreatePlayer } = usePlayer();
  const { sessionKey } = useParams();
  const { getGameBySessionKey } = useGame();
  const navigate = useNavigate();

  const {
    connection,
    players,
    currentGame,
    setCurrentGame,
    currentProgress,
    curQuestion,
    setToAnsweredLoading,
    toAnsweredLoading,
  } = useQuizHubPlayer(sessionKey, currentPlayer);

  useEffect(() => {
    async function init() {
      if (!sessionKey) return;

      // Getting game
      const game = await getGameBySessionKey(sessionKey);
      console.log("Current game: ", game);

      if (!game) {
        console.log("Error get game");
        return;
      }

      setCurrentGame(game);

      // Getting player (player)
      const player = await getOrCreatePlayer(game.id, "player");
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

  useEffect(() => {
    if (!currentGame) {
      console.log("current game is undefined");
      return;
    }

    // Get info aboud quiz
    (async () => {
      const infoAboutQuizFromBack = await getInfoAboutQuizByQuizId(
        currentGame.quizId,
      );
      setInfoAboutQuiz(infoAboutQuizFromBack);
    })();

    return () => {};
  }, [currentGame]);

  useEffect(() => {
    localStorage.setItem("answerHistory", JSON.stringify(answerHistory));
  }, [answerHistory]);

  // Select past question
  const selectCurrentQuestion = async (questionId: string) => {
    // dont delete me
    setIsEdit(true);

    await connection?.invoke(
      "SelectCurrentQuestion",
      questionId,
      currentGame?.quizId,
    );
  };

  const startGame = async () => {
    await connection?.invoke("StartGame", sessionKey, currentPlayer?.id);
  };

  const finishGame = async () => {
    await connection?.invoke("FinishGame", sessionKey, currentPlayer?.id);

    navigate(`/player-result/${currentProgress?.id}`);
  };

  const changeName = async (name: string) => {
    if (!currentPlayer) return;

    const changedPlayer: Player = {
      id: currentPlayer.id,
      nickname: name,
      role: currentPlayer.role,
    };

    await connection?.invoke("ChangeName", changedPlayer, sessionKey);

    console.log("All players after changer my name: ", players);
  };

  const toAnswer = async (answerId: string[]) => {
    if (!curQuestion) {
      console.log("Error to answer. Current question is null.");
      return;
    }

    if (!currentGame) {
      console.log("Error to anser, Current game is null");
      return;
    }

    if (!currentPlayer) {
      console.log("Error to anser, Current player is null");
      return;
    }

    // Answer history
    const existingAnswerInHistory = answerHistory.find(
      (ah) => ah.questionId === curQuestion.id,
    );

    if (existingAnswerInHistory) {
      // обновляем существующий ответ
      setAnswerHistory((prev) =>
        prev.map((ah) =>
          ah.questionId === curQuestion.id ? { ...ah, answerId: answerId } : ah,
        ),
      );
    } else {
      // добавляем новый
      setAnswerHistory((prev) => [
        ...prev,
        {
          questionId: curQuestion.id,
          answerId: answerId,
        },
      ]);
    }

    // set loading
    setToAnsweredLoading(true);

    const toAnswerRequest = {
      sessionKey: currentGame.key,
      questionId: curQuestion.id,
      answersIds: answerId,
      quizId: currentGame.quizId,
      playerId: currentPlayer.id,
      gameId: currentGame.id,
    };

    console.log("Send to back this answer - ", toAnswerRequest);

    connection?.invoke("ToAnswer", toAnswerRequest);
  };

  return (
    <PlayerContext.Provider
      value={{
        answerHistory,
        toAnsweredLoading,
        isEdit,
        setIsEdit,
        infoAboutQuiz,
        curQuestion,
        toAnswer,
        sessionKey,
        players,
        currentGame,
        startGame,
        selectCurrentQuestion,
        currentProgress,
        finishGame,
        currentPlayer,
        changeName,
        setAnswerHistory,
      }}
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

export interface ActualProgress {
  id: number;
  questions: ActualQuestion[];
}

export interface ActualQuestion {
  id: string;
  index: number;
  type: string;
  answers: AnswerResult[];
}
