import type { ProgressForAdmin } from "../../../../../../../../../core/hooks/quiz-game-microservice/useProgress";
import styles from "./ResultItem.module.css";

interface Props {
  progress: ProgressForAdmin;
}

export default function ResultItem({ progress }: Props) {
  const convertStatusToString = (value: number) => {
    switch (value) {
      case 0:
        return "в комнате ожидания";
      case 1:
        return "в игре";
      case 2:
        return "заврешил";
    }
  };

  return (
    <div className={styles.main}>
      <label>{progress.player.nickname}</label>
      <span>
        {progress.quantityCorrectAnswers} из{" "}
        {progress.quantityRemainedQuestions}
      </span>
      <label> {convertStatusToString(progress.status)}</label>
    </div>
  );
}
