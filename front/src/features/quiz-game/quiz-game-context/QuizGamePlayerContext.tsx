import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Player } from "../../../core/hooks/quiz-game-microservice/usePlayer";
import type { GameDTO } from "../../../core/hooks/quiz-game-microservice/useGame";
import useQuizHubPlayer from "../../../core/hooks/quiz-game-microservice/useQuizHubPlayer";
import useQuizApi, {
  type QuizWithQuestionsIds,
} from "../../../core/hooks/quiz-creation-microservice/useQuizApi";
import type { QuestionWithAnswers } from "../../../core/hooks/quiz-creation-microservice/useQuestion";
import useQuestion from "../../../core/hooks/quiz-creation-microservice/useQuestion";
import type {
  ProgressDTO,
  QuestionResult,
} from "../../../core/hooks/quiz-game-microservice/useProgress";
import type { AnswerDTO } from "../../../core/hooks/quiz-creation-microservice/useAnswer";

interface QuizGamePlayerContextType {
  currentQuestion: QuestionWithAnswers | undefined;
  sessionKey: string | undefined;
  players: Player[] | undefined;
  currentGame: GameDTO | undefined;
  lightQuiz: QuizWithQuestionsIds | undefined;
  currentProgress: ProgressDTO | undefined;
  startGame: () => void;
  selectCurrentQuestion: (questionId: number) => void;
  giveAnswer: (question: AnswerDTO) => void;
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
  const [currentQuestion, setCurrentQuestion] = useState<QuestionWithAnswers>();
  const [lightQuiz, setLightQuiz] = useState<QuizWithQuestionsIds>();

  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>();

  const { getQuizWithQuestionsIds } = useQuizApi();
  const { getQuestionWithAnswers } = useQuestion();
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
  }, [setCurrentGame, setCurrentProgress]);

  useEffect(() => {
    if (!currentGame) {
      console.log("currentGame is undefined");
      return;
    }

    let cancelled = false;

    (async () => {
      const quiz = await getQuizWithQuestionsIds(currentGame.quizId);
      if (!cancelled) {
        setLightQuiz(quiz);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentGame, getQuizWithQuestionsIds]);

  const selectCurrentQuestion = async (questionId: number) => {
    const question = await getQuestionWithAnswers(questionId);
    if (question === undefined) {
      console.log("Error selectCurrentQuestion");
      return;
    }

    localStorage.setItem(
      "currentQuestionId",
      JSON.stringify(question.questionId),
    );
    setCurrentQuestion(question);
  };

  useEffect(() => {
    const firstQuestion = lightQuiz?.questionsIds[0];
    if (!firstQuestion) {
      if (lightQuiz) {
        console.log("first question is null");
      }
      return;
    }
    void selectCurrentQuestion(firstQuestion);
  }, [lightQuiz]);

  const startGame = async () => {
    await connection?.invoke("StartGame", sessionKey, currentPlayer?.id);
  };

  const finishGame = async () => {
    await connection?.invoke("FinishGame", sessionKey, currentPlayer?.id);
  };

  const giveAnswer = async (answer: AnswerDTO) => {
    if (!answer.id || !currentQuestion) {
      console.log("Error add answer");
      return;
    }

    if (!currentGame || !currentPlayer || !connection) {
      console.log("Current game, player or connection is undefined");
      return;
    }

    const question: QuestionResult = {
      answer: answer.text,
      answerId: answer.id,
      isCorrect: answer.isCorrect,
      question: currentQuestion.title,
      questionId: currentQuestion.questionId,
    };

    console.log("Answer for server:", question);

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
        sessionKey,
        players,
        currentGame,
        startGame,
        lightQuiz,
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
