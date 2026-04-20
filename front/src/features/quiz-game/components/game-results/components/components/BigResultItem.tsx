import { useNavigate } from "react-router-dom";
import styles from "./BigResultItem.module.css";
import type { ProgressForAdmin } from "../../../../../../core/api/quiz-game-service/useProgress";
import { useState } from "react";
import type { ResultType, ResultUI } from "../BigResultList";

interface Props {
  // progress: ProgressForAdmin;
  progress: ResultUI;
  resultType: ResultType;
}

export default function BigResultItem({ progress, resultType }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const selectHandler = () => {
    // navigate(`/player-progress/${progress}`)
  };

  return (
    <div className={styles.main}>
      <div className={styles.short} onClick={selectHandler}>
        <div className={styles.name}>
          <span className={styles.nickname}>Имя</span>
          <label>
            {/* {progress.player.nickname} */}
            {progress.playerName}
          </label>
        </div>
        <div className={styles.result}>
          <span className={styles.score}>
            {resultType === "grade"
              ? "Оценка: "
              : resultType === "precent"
                ? "Результат: "
                : "Результат: "}
          </span>
          <label>{progress.result}</label>
        </div>
      </div>
    </div>
  );
}
