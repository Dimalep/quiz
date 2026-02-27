import { useState } from "react";
import styles from "./SettingsSession.module.css";
import { useQuizGameAdminContext } from "../../../../quiz-game-context/QuizGameAdminContext";
import Buttons from "./components/Buttons";

export default function SettingsSession() {
  const {
    startGame,
    completeGame,
    currentGame,
    openForConnect,
    closeForConnect,
  } = useQuizGameAdminContext();
  const [time, setTime] = useState<number>(0);

  const convertStatus = (value: number | undefined): string => {
    if (value === 0) return "Комната открыта";
    else if (value === 1) return "Комната закрыта";
    else if (value === 2) return "Игра запущена";
    return "";
  };

  return (
    <div className={styles.main}>
      <div>
        <h4>Время на выполение</h4>
        <select value={time} onChange={(e) => setTime(Number(e.target.value))}>
          <option value={1}>1 час</option>
          <option value={2}>2 час</option>
          <option value={3}>3 час</option>
        </select>
        <h4>Статус</h4>
        <span>{convertStatus(currentGame?.status)}</span>
      </div>
      <Buttons />
    </div>
  );
}
