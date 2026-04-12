import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Player } from "../../../core/hooks/quiz-game-microservice/usePlayer";
import type { GameDTO } from "../../../core/hooks/quiz-game-microservice/useGame";
import useQuizHubPlayer from "../../../core/hooks/quiz-game-microservice/useQuizHubPlayer";
import useQuizApi from "../../../core/hooks/quiz-creation-microservice/useQuizApi";
import type {
  AnswerResult,
  Progress,
  QuestionResult,
} from "../../../core/hooks/quiz-game-microservice/useProgress";
import type {
  Question,
  Quiz,
} from "../../quiz-creation/manual-create/create-context/reducer";
import usePlayer from "../../../core/hooks/quiz-game-microservice/usePlayer";
import useGame from "../../../core/hooks/quiz-game-microservice/useGame";

interface QuizGamePlayerContextType {
  quiz: Quiz | undefined;
  currentQuestion: Question | undefined;
  sessionKey: string | undefined;
  players: Player[] | undefined;
  currentGame: GameDTO | undefined;
  currentProgress: Progress | undefined;
  currentPlayer: Player | undefined;
  isEnd: boolean;
  actualProgress: ActualProgress;
  setIsEnd: (value: boolean) => void;
  startGame: () => void;
  selectCurrentQuestion: (questionId: number) => void;
  giveAnswer: (answers: AnswerResult[]) => void;
  finishGame: () => void;
  changeName: (name: string) => void;
}

const PlayerContext = createContext<QuizGamePlayerContextType | undefined>(
  undefined,
);

export default function QuizGamePlayerContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>();
  const [isEnd, setIsEnd] = useState(false);
  const [actualProgress, setActualProgress] = useState<ActualProgress>(() => {
    const saved = localStorage.getItem("progress");
    if (saved) {
      try {
        return JSON.parse(saved) as ActualProgress;
      } catch {
        return { id: 0, questions: [] };
      }
    }
    return { id: 0, questions: [] };
  });

  const { getByIdWithShuffledQuestions } = useQuizApi();
  const { getOrCreatePlayer } = usePlayer();
  const { sessionKey } = useParams();
  const { getGameBySessionKey } = useGame();
  const navigate = useNavigate();

  const { connection, players, currentGame, setCurrentGame, currentProgress } =
    useQuizHubPlayer(sessionKey, currentPlayer);

  useEffect(() => {
    async function init() {
      if (!sessionKey) return;

      const game = await getGameBySessionKey(sessionKey);
      if (!game) {
        console.log("Error get game");
        return;
      }

      setCurrentGame(game);

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
      console.log("currentGame is undefined");
      return;
    }

    let cancelled = false;

    (async () => {
      const quiz = await getByIdWithShuffledQuestions(currentGame.quizId);
      if (!cancelled && quiz?.questions) {
        const questions: Question[] = quiz.questions.map((q, index) => ({
          ...q,
          index: index,
        }));

        setQuiz({
          ...quiz,
          questions,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentGame]);

  useEffect(() => {
    const firstQuestion = quiz?.questions[0];
    if (!firstQuestion) {
      if (quiz) {
        console.log("first question is null");
      }
      return;
    }
    selectCurrentQuestion(firstQuestion.index);
  }, [quiz]);

  const selectCurrentQuestion = async (questionIndex: number) => {
    const question = quiz?.questions.find((q) => q.index === questionIndex);

    localStorage.setItem(
      "currentQuestionIndex",
      JSON.stringify(question?.index),
    );
    setCurrentQuestion(question);
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

  const giveAnswer = async (
    answers: AnswerResult[],
  ): Promise<boolean | undefined> => {
    if (!currentQuestion) {
      console.log("Error add answer");
      return;
    }

    if (!currentGame || !currentPlayer || !connection || !quiz) {
      console.log("Missing required data");
      return;
    }

    const question: QuestionResult = {
      id: currentQuestion.id,
      answers,
      questionIndex: currentQuestion.index,
      questionText: currentQuestion.text,
    };

    await connection.invoke(
      "GiveAnswer",
      currentGame.sessionKey,
      question,
      currentPlayer.id,
    );

    const nextQuestionIndex =
      currentQuestion.index + 1 >= quiz.quantityQuestions
        ? quiz.quantityQuestions
        : currentQuestion.index + 1;

    if (actualProgress.questions.map((q) => q.id !== currentQuestion.id)) {
      setActualProgress((prev) => {
        const base = prev ?? {
          id: currentProgress?.id ?? 0,
          questions: [],
        };

        const exists = base.questions.some((q) => q.id === currentQuestion.id);

        const updated = {
          ...base,
          questions: exists
            ? base.questions.map((q) =>
                q.id === currentQuestion.id ? { ...q, answers } : q,
              )
            : [
                ...base.questions,
                {
                  id:
                    currentQuestion.id !== undefined
                      ? currentQuestion.id.toString()
                      : "",
                  index: currentQuestion.index,
                  type: currentQuestion.type,
                  answers,
                },
              ],
        };

        localStorage.setItem("progress", JSON.stringify(updated));

        return updated;
      });
    }

    if (nextQuestionIndex >= quiz.quantityQuestions) {
      setIsEnd(true);
      return;
    }

    selectCurrentQuestion(nextQuestionIndex);
  };

  return (
    <PlayerContext.Provider
      value={{
        quiz,
        sessionKey,
        players,
        currentGame,
        isEnd,
        actualProgress,
        setIsEnd,
        startGame,
        selectCurrentQuestion,
        giveAnswer,
        currentQuestion,
        currentProgress,
        finishGame,
        currentPlayer,
        changeName,
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
