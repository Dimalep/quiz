import styles from "./ResultsList.module.css";
import { useQuizGameAdminContext } from "../../../../../../quiz-game-context/QuizGameAdminContext";
import ResultItem from "./components/ResultItem";

export default function ResultsList() {
  const { progresses } = useQuizGameAdminContext();

  return (
    <div className={styles.main}>
      {progresses.map((el) => (
        <ResultItem key={el.id} progress={el} />
      ))}
    </div>
  );
}
