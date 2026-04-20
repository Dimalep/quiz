import MainContainerGame from "../../../../common-components/main-container-game/MainContainerGame";
import { useQuizGameAdminContext } from "../../../../quiz-game-context/QuizGameAdminContext";
import styles from "./SettingsSession.module.css";

export default function SettingsSession() {
  const { currentGame, completeGame, startGame } = useQuizGameAdminContext();

  if (currentGame?.status === "opened" || currentGame?.status === "closed")
    return (
      <MainContainerGame title="Настройки" mainMarginTop={20}>
        <div className={styles.main}>
          <button className={styles.launch} onClick={startGame}>
            Начать
          </button>
          <button className={styles.complete} onClick={completeGame}>
            Завершить
          </button>
        </div>
      </MainContainerGame>
    );

  if (currentGame?.status === "launched")
    return (
      <MainContainerGame title="Настройки" mainMarginTop={20}>
        <button className={styles.complete_launched} onClick={completeGame}>
          Завершить квиз
        </button>
      </MainContainerGame>
    );
}
