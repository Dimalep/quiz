import { createContext, useContext, useEffect, useState } from "react";
import useQuizApi from "../../core/api/quiz-creation-service/useQuizApi";
import type { Quiz } from "../quiz-creation/manual-create/create-context/reducer";
import useGame, {
  type Game,
  type GameDTO,
} from "../../core/api/quiz-game-service/useGame";
import useUser, { type User } from "../../core/api/user-service/useUser";
import { useNavigate } from "react-router-dom";

interface ProfileContextType {
  myQuizzes: Quiz[] | undefined;
  me: User | undefined;
  mode: "history_games" | "quizzes";
  games: Game[] | undefined;
  deleteQuiz: (quizId: number) => void;
  initialGame: (quizId: number) => Promise<GameDTO | undefined>;
  openHistory: () => void;
  openGames: () => void;
  editQuiz: (quizId: number) => void;
  launchQuizGame: (quiz: Quiz) => void;
  openGame: (game: GameDTO) => void;
  openGameResults: (sessionKey: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"history_games" | "quizzes">("quizzes");
  const [myQuizzes, setMyQuizzes] = useState<Quiz[] | undefined>([]);
  const [games, setGames] = useState<Game[]>();
  const [me, setMe] = useState<User>();

  const { getQuizzesByUserId, deleteQuizById, getQuizById } = useQuizApi();
  const { initialGame, getGamesByUserId } = useGame();
  const { getUserById } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function GetMyQuizzes() {
      const rowUserId = localStorage.getItem("userId");
      if (rowUserId === null) return;

      const quizzes: Quiz[] | undefined = await getQuizzesByUserId(
        Number(rowUserId),
      );
      setMyQuizzes(quizzes);

      const games: Game[] | undefined = await getGamesByUserId();
      console.log(games);
      setGames(games);

      const user = await getUserById(Number(rowUserId));
      if (!user) {
        console.log("Error get user");
        return;
      }
      setMe(user);
    }
    GetMyQuizzes();
  }, []);

  const openGameResults = async (sessionKey: string) => {
    navigate(`/game-result/${sessionKey}`);
  };

  const launchQuizGame = async (quiz: Quiz) => {
    const res = confirm(`Запустить квиз ${quiz.title}?`);
    if (res) {
      const game = await initialGame(quiz.id);
      if (!game) return;
      localStorage.setItem("quizSession", JSON.stringify(game));
      navigate(`/quiz/game/admin/${game.sessionKey}`);
    }
  };

  const openGame = (game: GameDTO) => {
    navigate(`/quiz/game/admin/${game.sessionKey}`);
  };

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

  const openHistory = async () => {
    setMode("history_games");
  };

  const openGames = async () => {
    setMode("quizzes");
  };

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
