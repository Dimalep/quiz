import { useState } from "react";
import { useCreateContext } from "../../../../../create-context/CreateProvider";
import styles from "./QuestionSettings.module.css";

export default function QuestionSettings() {
  const { dispatch, completeCreation } = useCreateContext();
  const [openSettings, setOpenSettings] = useState(false);

  const completeCreationHandleClick = async () => {
    await completeCreation();
  };

  return (
    <div className={styles.main}>
      <button
        className={styles.primaryButton}
        onClick={completeCreationHandleClick}
      >
        Завершить создание
      </button>

      <div className={styles.actions}>
        <button
          className={styles.settingsButton}
          onClick={() => setOpenSettings((prev) => !prev)}
        >
          ⚙ Настройки
        </button>

        <button
          className={styles.deleteButton}
          onClick={() => dispatch({ type: "DELETE_QUESTION" })}
        >
          🗑 Удалить
        </button>
      </div>

      {openSettings && (
        <div className={styles.settingsBlock}>
          <p className={styles.placeholder}>Пока пусто</p>
        </div>
      )}
    </div>
  );
}
