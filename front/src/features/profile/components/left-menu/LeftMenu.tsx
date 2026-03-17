import styles from "./LeftMenu.module.css";
import { useProfileContext } from "../../ProfileProvider";

export default function LeftMenu() {
  const { openHistory, openGames, mode } = useProfileContext();

  return (
    <div className={styles.main}>
      <div className={styles.long}>
        <button
          className={mode === "quizzes" ? styles.selected : styles.btn}
          onClick={openGames}
        >
          мои квизы
        </button>

        <button
          className={mode === "history_games" ? styles.selected : styles.btn}
          onClick={openHistory}
        >
          история игр
        </button>
      </div>

      <div className={styles.short}>
        <button onClick={openGames}>MQ</button>
        <button onClick={openHistory}>GH</button>
      </div>
    </div>
  );
}
