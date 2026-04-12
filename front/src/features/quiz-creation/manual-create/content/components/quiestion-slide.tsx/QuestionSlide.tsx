import Answers from "./components/answers/Answers";
import Media from "./components/media/Media";
import QuestionTitle from "./components/question-title/QuestionTitle";
import { useCreateContext } from "../../../create-context/CreateProvider";
import styles from "./QyestionSlide.module.css";
import { useState } from "react";
import ComplexityBlock from "./components/complexity/ComplexityBlock";

export default function QuestionSlide() {
  const { state, dispatch, completeCreation } = useCreateContext();

  const [isOpen, setIsOpen] = useState(false);

  const nextHandleClick = () => {
    dispatch({ type: "REMOVE_EMPTY_ANSWERS_FROM_QUESTION" });

    dispatch({ type: "OPEN_NEXT_QUESTION" });
  };

  const prevHandleClick = () => {
    dispatch({ type: "REMOVE_EMPTY_ANSWERS_FROM_QUESTION" });

    dispatch({ type: "OPEN_PREV_QUESTION" });
  };

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <label className={styles.next_btn} onClick={prevHandleClick}>
          Предыдущий
        </label>
        <h1 className={styles.title}>Вопрос {state.currentQuestion?.index}</h1>
        <label className={styles.next_btn} onClick={nextHandleClick}>
          Следующий
        </label>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.settings_btn}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Настройки
        </button>
        <button
          className={styles.complete_btn}
          onClick={async () => await completeCreation()}
        >
          Завершить создание
        </button>
      </div>

      <ComplexityBlock />

      <QuestionTitle />

      <Media />

      <Answers />

      {/* Модальное окно */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Настройки вопроса</h2>
            <button
              className={styles.modalButton}
              onClick={() => {
                dispatch({ type: "DELETE_QUESTION" });
                setIsOpen(false);
              }}
            >
              Удалить вопрос
            </button>
            <button
              className={styles.modalClose}
              onClick={() => setIsOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
