import styles from "./ResultsList.module.css";
import { useQuizGameAdminContext } from "../../../../../../quiz-game-context/QuizGameAdminContext";
import ResultItem from "./components/ResultItem";

export default function ResultsList() {
  const { progresses } = useQuizGameAdminContext();

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <span>Игрок</span>
        <span>Результат</span>
        <span>Статус</span>
      </div>
      {progresses.map((el) => (
        <ResultItem key={el.player.id} progress={el} />
      ))}
    </div>
  );
}
