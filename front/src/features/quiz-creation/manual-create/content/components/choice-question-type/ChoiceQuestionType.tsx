import ButtonType from "./components/ButtonType";
import styles from "./ChoiceQuestionType.module.css";

export default function ChoiceQuestionType() {
  return (
    <div className={styles.main}>
      <ButtonType title="Один ответ" questionType={"buttons"} />
      <ButtonType title="Несколько ответов" questionType={"checkboxes"} />
      <ButtonType title="Свободный ответ" questionType={"input_field"} />
    </div>
  );
}
