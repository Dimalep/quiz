import { useState } from "react";
import { useQuizGameAdminContext } from "../../../../../quiz-game-context/QuizGameAdminContext";
import styles from "./SettingsSession.module.css";

export default function SettingsSession() {
  const { startGame, completeGame, currentQuizSession } =
    useQuizGameAdminContext();
  const [time, setTime] = useState<number>(0);

  return (
    <div className={styles.main}>
      <div>
        <h4>Время на выполение</h4>
        <select value={time} onChange={(e) => setTime(Number(e.target.value))}>
          <option value={1}>1 час</option>
          <option value={2}>2 час</option>
          <option value={3}>3 час</option>
        </select>
      </div>
      <div className={styles.buttons}>
        <button className={styles.start} onClick={() => startGame()}>
          Запустить игру
        </button>
        <button className={styles.complete} onClick={() => completeGame()}>
          Завершить игру
        </button>
      </div>
    </div>
  );
}
