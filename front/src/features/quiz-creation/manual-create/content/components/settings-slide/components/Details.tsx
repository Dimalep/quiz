import { useCreateContext } from "../../../../create-context/CreateProvider";
import styles from "./Details.module.css";

export default function Details() {
  const { quiz } = useCreateContext();
  return (
    <div className={styles.main}>
      <span>Количество вопросов: {quiz.slides.length}</span>
      <div className={styles.time}>
        <span>Время на выполение</span>
        <input placeholder="time"></input>
      </div>
    </div>
  );
}
