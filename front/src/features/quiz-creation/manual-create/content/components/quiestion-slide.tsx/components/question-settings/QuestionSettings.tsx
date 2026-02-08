import { useCreateContext } from "../../../../../create-context/CreateProvider";
import styles from "./QuestionSettings.module.css";

export default function QuestionSettings() {
  const { removeSlide } = useCreateContext();

  return (
    <div className={styles.main}>
      <button className={styles.complete_creation}>Завершить создание</button>
      <div className={styles.settings_delete_block}>
        <div className={styles.settings}>Настройки вопроса</div>
        <button className={styles.button} onClick={() => removeSlide()}>
          Удалить
        </button>
      </div>
    </div>
  );
}
