import { useProfileContext } from "../../ProfileProvider";
import GameItem from "./components/game-item/GameItem";
import QuizItem from "./components/quiz-item.tsx/QuizItem";
import styles from "./Content.module.css";

export default function Content() {
  const { myQuizzes, mode, games } = useProfileContext();

  const quizList = myQuizzes ? (
    <div className={styles.quiz_list}>
      {myQuizzes?.map((el) => (
        <QuizItem key={el.id} quiz={el} />
      ))}
    </div>
  ) : (
    <label>loading..</label>
  );

  const gameList = games ? (
    <div>
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
