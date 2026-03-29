import type { ProgressForAdmin } from "../../../../core/hooks/quiz-game-microservice/useProgress";
import styles from "./BigResultItem.module.css";

interface Props {
  progress: ProgressForAdmin;
  getProgressById: (progressId: number) => void;
}

export default function BigResultItem({ progress, getProgressById }: Props) {
  const selectHandler = async () => {
    // getProgressById(progress.)
  };

  return (
    <div className={styles.main}>
      <div className={styles.short} onClick={selectHandler}>
        <label>{progress.player.nickname}</label>
        <span>|</span>
        <label>{progress.quantityCorrectAnswers}</label>
      </div>
    </div>
  );
}
