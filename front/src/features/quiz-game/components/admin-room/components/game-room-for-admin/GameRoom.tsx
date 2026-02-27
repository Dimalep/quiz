import { useQuizGameAdminContext } from "../../../../quiz-game-context/QuizGameAdminContext";
import ResultsList from "./components/results-list/ResultsList";
import styles from "./GameRoom.module.css";

export default function GameRoom() {
  const { completeGame } = useQuizGameAdminContext();

  return (
    <div className={styles.main}>
      <div>
        <button onClick={() => completeGame()}>Завершить квиз</button>
      </div>
      <ResultsList />
    </div>
  );
}
