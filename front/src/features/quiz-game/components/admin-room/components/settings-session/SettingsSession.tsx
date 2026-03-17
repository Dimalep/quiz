import { useQuizGameAdminContext } from "../../../../quiz-game-context/QuizGameAdminContext";
import styles from "./SettingsSession.module.css";

export default function SettingsSession() {
  const { currentGame, completeGame, startGame } = useQuizGameAdminContext();

  if (currentGame?.status === 0)
    return (
      <div className={styles.main}>
        <button className={styles.start} onClick={startGame}>
          Запустить
        </button>
        <button className={styles.danger} onClick={completeGame}>
          Завершить
        </button>
      </div>
    );

  if (currentGame?.status === 1)
    return (
      <div className={styles.main}>
        <button className={styles.start} onClick={startGame}>
          Запустить
        </button>
        <button onClick={completeGame}>Завершить</button>
      </div>
    );

  if (currentGame?.status === 2)
    return (
      <div className={styles.main}>
        <button onClick={completeGame}>Завершить квиз</button>
      </div>
    );
}
