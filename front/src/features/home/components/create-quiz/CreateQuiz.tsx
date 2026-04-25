import { useNavigate } from "react-router-dom";
import styles from "./CreateQuiz.module.css";
import Button from "./components/Button";

export default function CreateQuiz() {
  //#region tmp
  const navigate = useNavigate();
  //#endregion

  return (
    <div className={styles.main}>
      <div className={styles.manual}>
        <h2>Создать квиз</h2>
        <h4>Создай свой квиз с нуля</h4>

        <Button />
      </div>
      <div className={styles.generator}>
        <h2>Сгенерировать квиз</h2>
        <h4>Сгенерируй свой квиз с нуля</h4>

        <button onClick={() => navigate("/quiz/generate")}>Начать</button>
      </div>
    </div>
  );
}
