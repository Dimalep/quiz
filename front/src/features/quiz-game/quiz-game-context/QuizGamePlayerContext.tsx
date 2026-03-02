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

interface QuizGamePlayerContextType {
  currentQuestion: QuestionWithAnswers | undefined;
  sessionKey: string | undefined;
  players: Player[] | undefined;
  currentGame: GameDTO | undefined;
  lightQuiz: QuizWithQuestionsIds | undefined;
  startGame: () => void;
  selectCurrentQuestion: (questionId: number) => void;
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

  const { connection, players, currentGame, setCurrentGame } = useQuizHubPlayer(
    sessionKey,
    currentPlayer,
  );

  useEffect(() => {
    const data = localStorage.getItem("player");
    if (data === null) return;
    const player = JSON.parse(data);
    setCurrentPlayer(player);

    const game = localStorage.getItem("currentGame");
    if (game === null) {
      console.log("Game is null");
      return;
    }
    setCurrentGame(JSON.parse(game));
  }, []);

  useEffect(() => {
    if (!currentGame) {
      console.log("currentGame is undefined");
      return;
    }

    const init = async () => {
      const tmp = await getQuizWithQuestionsIds(currentGame.quizId);
      setLightQuiz(tmp);
    };

    init();
  }, [currentGame]);

  useEffect(() => {
    const firstQuestion = lightQuiz?.questionsIds[0];
    if (!firstQuestion) {
      console.log("first question is null");
      return;
    }
    selectCurrentQuestion(firstQuestion);
  }, [lightQuiz]);

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

  const startGame = async () => {
    await connection?.invoke("StartGame", sessionKey, currentPlayer?.id);
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
        currentQuestion,
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
