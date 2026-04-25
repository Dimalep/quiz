import styles from "./LeftMenu.module.css";
import { useProfileContext } from "../../ProfileProvider";
import MyQuizzes from "../../../../shared/icons/MyQuizzes";
import History from "../../../../shared/icons/History";
import { useAuthContext } from "../../../../shared/components/AuthProvider";

export default function LeftMenu() {
  const { openHistory, openGames, mode } = useProfileContext();
  const { logoutHandler } = useAuthContext();

  return (
    <div className={styles.main}>
      <div className={styles.desktop}>
        <button
          className={`${styles.btn} ${mode === "quizzes" ? styles.select : ""}`}
          onClick={openGames}
        >
          <MyQuizzes />
          <label>мои квизы</label>
        </button>

        <button
          className={`${styles.btn} ${mode === "history_games" ? styles.select : ""}`}
          onClick={openHistory}
        >
          <History />
          <label>история игр</label>
        </button>

        <button className={styles.exit} onClick={logoutHandler}>
          Выйти
        </button>
      </div>

      <div className={styles.mobile}>
        <button
          onClick={openGames}
          className={`${styles.btn} ${mode === "quizzes" ? styles.my_quizzes_btn_mobile : styles.btn_mobile}`}
        >
          <MyQuizzes />
        </button>
        <button
          onClick={openHistory}
          className={`${styles.btn} ${mode === "history_games" ? styles.history_btn_mobile : styles.btn_mobile}`}
        >
          <History />
        </button>
      </div>
    </div>
  );
}
