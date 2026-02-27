import { useCreateContext } from "../../../../create-context/CreateProvider";
import styles from "./Details.module.css";

export default function Details() {
  const { state } = useCreateContext();
  return (
    <div className={styles.main}>
      <span>Количество вопросов: {state.quiz.questions.length}</span>
      <div className={styles.time}>
        <span>Время на выполение</span>
        <select>
          <option value={"1"}>1 час</option>
          <option value={"2"}>2 часа</option>
          <option value={"3"}>3 часа</option>
        </select>
      </div>
    </div>
  );
}
