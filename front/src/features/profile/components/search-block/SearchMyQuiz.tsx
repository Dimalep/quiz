import { useProfileContext } from "../../ProfileProvider";
import styles from "./SearchMyQuiz.module.css";

export default function SearchMyQuiz() {
  const { mode } = useProfileContext();

  return (
    <div className={styles.main}>
      <input
        className={styles.input_search}
        type="text"
        placeholder={
          mode === "history_games" ? "Найти игру..." : "Найти квиз..."
        }
      />

      <div className={styles.ico_filter}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 5H21L14 13V19L10 21V13L3 5Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
