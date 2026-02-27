import { useQuizGameAdminContext } from "../../../../../quiz-game-context/QuizGameAdminContext";
import styles from "./Buttons.module.css";

export default function Buttons() {
  const {
    currentGame,
    openForConnect,
    closeForConnect,
    completeGame,
    startGame,
  } = useQuizGameAdminContext();

  if (currentGame?.status === 0)
    return (
      <div className={styles.main}>
        <button onClick={startGame}>Запустить квиз</button>
        <button onClick={closeForConnect}>Закыть доступ</button>
        <button onClick={completeGame}>Завершить квиз</button>
      </div>
    );

  if (currentGame?.status === 1)
    return (
      <div className={styles.main}>
        <button onClick={openForConnect}>Открыть доступ</button>
        <button onClick={completeGame}>Завершить квиз</button>
      </div>
    );

  if (currentGame?.status === 2)
    return (
      <div className={styles.main}>
        <button onClick={completeGame}>Завершить квиз</button>
      </div>
    );
}
