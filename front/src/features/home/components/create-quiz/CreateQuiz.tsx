import styles from "./CreateQuiz.module.css";
import Button from "./components/Button";

export default function CreateQuiz() {
  return (
    <div className={styles.main}>
      <h2>Создать квиз</h2>
      <h4>Создай свой квиз с нуля</h4>

      <Button />
    </div>
  );
}
