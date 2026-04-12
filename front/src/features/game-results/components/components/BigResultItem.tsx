import { useNavigate } from "react-router-dom";
import type { ProgressForAdmin } from "../../../../core/hooks/quiz-game-microservice/useProgress";
import styles from "./BigResultItem.module.css";

interface Props {
  progress: ProgressForAdmin;
}

export default function BigResultItem({ progress }: Props) {
  const navigate = useNavigate();

  const selectHandler = () => {
    navigate(`/player-progress/${progress}`)
  };

  return (
    <div className={styles.main}>
      <div className={styles.short} onClick={selectHandler}>
        <span className={styles.nickname}>{progress.player.nickname}</span>
        <span className={styles.score}>{progress.quantityCorrectAnswers}</span>
      </div>
    </div>
  );
}
