import type { ProgressForAdmin } from "../../../../../../../../../core/hooks/quiz-game-microservice/useProgress";
import styles from "./ResultItem.module.css";

interface Props {
  progress: ProgressForAdmin;
}

export default function ResultItem({ progress }: Props) {
  return (
    <div className={styles.main}>
      <label>{progress.player.nickname}</label>
      <span>
        {progress.quantityCorrectAnswers} из{" "}
        {progress.quantityRemainedQuestions}
      </span>
      <label> {progress.status}</label>
    </div>
  );
}
