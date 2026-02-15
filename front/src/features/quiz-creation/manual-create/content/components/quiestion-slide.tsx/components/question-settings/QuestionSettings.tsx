import { useState } from "react";
import { useCreateContext } from "../../../../../create-context/CreateProvider";
import styles from "./QuestionSettings.module.css";

export default function QuestionSettings() {
  const { dispatch } = useCreateContext();
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className={styles.main}>
      <button className={styles.complete_creation}>Завершить создание</button>
      <div className={styles.settings_delete_block}>
        <button
          className={styles.settings}
          onClick={() => setOpenSettings((prev) => !prev)}
        >
          Настройки вопроса
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: "DELETE_QUESTION" })}
        >
          Удалить
        </button>
      </div>
      {openSettings && <div className={styles.settings_block}>Пока пусто</div>}
    </div>
  );
}
