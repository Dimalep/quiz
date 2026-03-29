import type { ProgressForAdmin } from "../../../core/hooks/quiz-game-microservice/useProgress";
import styles from "./BigResultList.module.css";
import BigResultItem from "./components/BigResultItem";

interface Props {
  progresses: ProgressForAdmin[] | undefined;
  getProgressById: (progressId: number) => void;
}

export default function BigResultList({ progresses, getProgressById }: Props) {
  console.log(progresses);

  return (
    <div className={styles.main}>
      <h3>Результаты:</h3>
      {progresses?.map((el) => (
        <BigResultItem key={el.player.id} progress={el} getProgressById={getProgressById}/>
      ))}
    </div>
  );
}
