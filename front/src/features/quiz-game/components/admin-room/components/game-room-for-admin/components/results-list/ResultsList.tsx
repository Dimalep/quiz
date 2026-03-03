import styles from "./ResultsList.module.css";
import { useQuizGameAdminContext } from "../../../../../../quiz-game-context/QuizGameAdminContext";
import ResultItem from "./components/ResultItem";

export default function ResultsList() {
  const { progresses } = useQuizGameAdminContext();

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Игрок:</th>
          <th>Отеты:</th>
          <th>Статус:</th>
        </tr>
      </thead>
      <tbody>
        {progresses.map((el) => (
          <ResultItem key={el.player.id} progress={el} />
        ))}
      </tbody>
    </table>
  );
}
