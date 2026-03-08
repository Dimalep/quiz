import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Player } from "../../../core/hooks/quiz-game-microservice/usePlayer";
import type { GameDTO } from "../../../core/hooks/quiz-game-microservice/useGame";
import useQuizHubPlayer from "../../../core/hooks/quiz-game-microservice/useQuizHubPlayer";
import useQuizApi from "../../../core/hooks/quiz-creation-microservice/useQuizApi";
import type {
  AnswerResult,
  ProgressForPlayer,
  QuestionResult,
} from "../../../core/hooks/quiz-game-microservice/useProgress";
import type {
  Question,
  Quiz,
} from "../../quiz-creation/manual-create/create-context/reducer";

interface QuizGamePlayerContextType {
  quiz: Quiz | undefined;
  currentQuestion: Question | undefined;
  sessionKey: string | undefined;
  players: Player[] | undefined;
  currentGame: GameDTO | undefined;
  currentProgress: ProgressForPlayer | undefined;
  startGame: () => void;
  selectCurrentQuestion: (questionId: number) => void;
  giveAnswer: (answers: AnswerResult[]) => void;
  finishGame: () => void;
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

  const { getQuizById } = useQuizApi();
  const { sessionKey } = useParams();

  const {
    connection,
    players,
    currentGame,
    setCurrentGame,
    currentProgress,
    setCurrentProgress,
  } = useQuizHubPlayer(sessionKey, currentPlayer);

  useEffect(() => {
    const rawPlayer = localStorage.getItem("player");
    if (!rawPlayer) return;

    try {
      const player = JSON.parse(rawPlayer) as Player;
      setCurrentPlayer(player);
    } catch {
      console.log("Failed to parse player from localStorage");
    }

    const rawGame = localStorage.getItem("currentGame");
    if (!rawGame) {
      console.log("Game is null");
    } else {
      try {
        setCurrentGame(JSON.parse(rawGame));
      } catch {
        console.log("Failed to parse currentGame from localStorage");
      }
    }

    const rawProgress = localStorage.getItem("currentProgress");
    if (!rawProgress) {
      console.log("Progress is null");
    } else {
      try {
        setCurrentProgress(JSON.parse(rawProgress));
      } catch {
        console.log("Failed to parse currentProgress from localStorage");
      }
    }
  }, []);

  useEffect(() => {
    if (!currentGame) {
      console.log("currentGame is undefined");
      return;
    }

    let cancelled = false;

    (async () => {
      const quiz = await getQuizById(currentGame.quizId);
      if (!cancelled) {
        setQuiz(quiz);
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
    void selectCurrentQuestion(firstQuestion.index);
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
  };

  const giveAnswer = async (answers: AnswerResult[]) => {
    if (!currentQuestion) {
      console.log("Error add answer");
      return;
    }

    if (!currentGame || !currentPlayer || !connection) {
      console.log("Current game, player or connection is undefined");
      return;
    }

    if (!quiz) return;

    const nextQuestionIndex =
      quiz.quantityQuestions <= currentQuestion.index + 1
        ? quiz.quantityQuestions
        : currentQuestion.index + 1;

    selectCurrentQuestion(nextQuestionIndex);

    const question: QuestionResult = {
      answers: answers,
      questionIndex: currentQuestion.index,
      questionText: currentQuestion.text,
    };

    await connection.invoke(
      "GiveAnswer",
      currentGame.sessionKey,
      question,
      currentPlayer.id,
    );
  };

  return (
    <PlayerContext.Provider
      value={{
        quiz,
        sessionKey,
        players,
        currentGame,
        startGame,
        selectCurrentQuestion,
        giveAnswer,
        currentQuestion,
        currentProgress,
        finishGame,
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
