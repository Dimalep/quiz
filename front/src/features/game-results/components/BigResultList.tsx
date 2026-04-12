import type { ProgressForAdmin } from "../../../core/hooks/quiz-game-microservice/useProgress";
import styles from "./BigResultList.module.css";
import BigResultItem from "./components/BigResultItem";

interface Props {
  progresses: ProgressForAdmin[] | undefined;
}

export default function BigResultList({ progresses }: Props) {
  console.log(progresses);

  return (
    <div className={styles.main}>
      <h3>Результаты:</h3>
      {progresses?.map((el) => (
        <BigResultItem
          key={el.player.id}
          progress={el}
        />
      ))}
    </div>
  );
}
