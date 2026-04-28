import { createContext, useContext, useEffect, useState } from "react";
import useQuizApi from "../../core/api/quiz-creation-service/useQuizApi";
import type { Quiz } from "../quiz-creation/manual-create/create-context/reducer";
import useGame, {
  type GameDTO,
  type GameHistory,
} from "../../core/api/quiz-game-service/useGame";
import { type User } from "../../core/api/user-service/useUser";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../shared/components/AuthProvider";

interface ProfileContextType {
  myQuizzes: Quiz[] | undefined;
  me: User | undefined;
  mode: "history_games" | "quizzes";
  games: GameHistory[] | undefined;
  deleteQuiz: (quizId: number) => void;
  initialGame: (quizId: number) => Promise<GameDTO | undefined>;
  openHistory: () => void;
  openGames: () => void;
  editQuiz: (quizId: number) => void;
  launchQuizGame: (quiz: Quiz) => void;
  openGame: (key: string) => void;
  openGameResults: (sessionKey: string) => void;
  createQuiz: () => void;
  deleteByIdHandler: (gameId: number) => void;
  completeByIdHandler: (gameId: number) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"history_games" | "quizzes">("quizzes");
  const [myQuizzes, setMyQuizzes] = useState<Quiz[] | undefined>([]);
  const [games, setGames] = useState<GameHistory[]>();
  const [me, setMe] = useState<User>();

  const { getQuizzesByUserId, deleteQuizById, getQuizById, createNewQuiz } =
    useQuizApi();
  const { initialGame, getGamesByUserId, deleteGameById, completeGameById } =
    useGame();
  const { currentUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (currentUser === undefined) return;

      if (currentUser === null) {
        console.error("User should not be null here");
        return;
      }

      const quizzes = await getQuizzesByUserId(currentUser.id);
      setMyQuizzes(quizzes);

      const games = await getGamesByUserId();
      setGames(games);

      setMe(currentUser);
    })();
  }, [currentUser]);

  // COMPLETE GAME
  async function completeByIdHandler(gameId: number) {
    await completeGameById(gameId);
    const games = await getGamesByUserId();
    setGames(games);
  }

  // DELETE GAME FROM LIST
  async function deleteByIdHandler(gameId: number) {
    await deleteGameById(gameId);
    const games = await getGamesByUserId();
    setGames(games);
  }

  // CREATE NEW QUIZ
  async function createQuiz() {
    const saved = localStorage.getItem("quizDraft");
    const rowUserId = localStorage.getItem("userId");

    if (rowUserId === null) {
      console.log("User id is null");
      return;
    }

    let quizId: number | undefined;

    if (saved) {
      const result = window.confirm(
        "У вас есть недоделанный тест, хотите ли удалить его?",
      );

      if (result) {
        localStorage.removeItem("quizDraft");
        quizId = await createNewQuiz(Number(rowUserId));
      } else {
        const parsed = JSON.parse(saved);
        quizId = parsed.quiz.id;
      }
    } else {
      quizId = await createNewQuiz(Number(rowUserId));
    }

    navigate(`/quiz/${quizId}`);
  }

  // OPEN RESULTS
  const openGameResults = async (sessionKey: string) => {
    navigate(`/game-result/${sessionKey}`);
  };

  // LAUNCH NEW GAME
  const launchQuizGame = async (quiz: Quiz) => {
    const res = confirm(`Запустить квиз ${quiz.title}?`);
    if (res) {
      const game = await initialGame(quiz.id);
      if (!game) return;
      localStorage.setItem("quizSession", JSON.stringify(game));
      navigate(`/quiz/game/admin/${game.key}`);
    }
  };

  // JUST OPEN LAUNCHEDED GAME
  const openGame = (key: string) => {
    navigate(`/quiz/game/admin/${key}`);
  };

  // EDIT QUIZ
  const editQuiz = async (quizId: number) => {
    const quiz = await getQuizById(quizId);
    if (quiz === undefined) {
      alert("Ошибка получения квизв");
      return;
    }

    localStorage.setItem(
      "quizDraft",
      JSON.stringify({
        quiz: quiz,
        currentQuestion: undefined,
      }),
    );

    navigate(`/quiz/${quizId}`);
  };

  // SHOW GAME HISTORY LIST
  const openHistory = async () => {
    setMode("history_games");
  };

  // SHOW MY QUIZZES LIST
  const openGames = async () => {
    setMode("quizzes");
  };

  // DELETE QUIZ
  const deleteQuiz = async (quizId: number) => {
    await deleteQuizById(quizId);

    const rowUserId = localStorage.getItem("userId");
    if (rowUserId === null) return;
    const quizzes: Quiz[] | undefined = await getQuizzesByUserId(
      Number(rowUserId),
    );
    setMyQuizzes(quizzes);
  };

  return (
    <ProfileContext.Provider
      value={{
        myQuizzes,
        me,
        mode,
        games,
        deleteQuiz,
        initialGame,
        openHistory,
        openGames,
        editQuiz,
        launchQuizGame,
        openGame,
        openGameResults,
        createQuiz,
        deleteByIdHandler,
        completeByIdHandler,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useCreateContext err");
  }
  return context;
}
