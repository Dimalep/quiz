import { useMemo } from "react";
import { useProfileContext } from "../../ProfileProvider";
import GameItem from "./components/game-item/GameItem";
import QuizItem from "./components/quiz-item.tsx/QuizItem";
import styles from "./Content.module.css";

interface Props {
  filterDate: "new" | "old";
}

export default function Content({ filterDate }: Props) {
  const { myQuizzes, mode, games } = useProfileContext();

  const sortedGames = useMemo(() => {
    return [...(games ?? [])].sort((a, b) => {
      const aTime = new Date(a.createAt).getTime();
      const bTime = new Date(b.createAt).getTime();

      return filterDate === "new" ? bTime - aTime : aTime - bTime;
    });
  }, [games, filterDate]);

  //my quizzes list
  const quizList = myQuizzes ? (
    <div className={styles.list}>
      {myQuizzes?.map((el) => (
        <QuizItem key={el.id} quiz={el} />
      ))}
    </div>
  ) : (
    <label>loading..</label>
  );

  //history my games
  const gameList = sortedGames ? (
    <div className={styles.list}>
      {games?.map((el) => (
        <GameItem key={el.id} game={el} />
      ))}
    </div>
  ) : (
    <label>loading....</label>
  );

  if (mode === "quizzes") return <div className={styles.main}>{quizList}</div>;
  else if (mode === "history_games")
    return <div className={styles.main}>{gameList}</div>;
  else return <div>error</div>;
}
