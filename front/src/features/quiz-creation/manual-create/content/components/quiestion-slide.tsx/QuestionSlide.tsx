import Answers from "./components/answers/Answers";
import Media from "./components/media/Media";
import QuestionTitle from "./components/question-title/QuestionTitle";
import { useCreateContext } from "../../../create-context/CreateProvider";
import styles from "./QyestionSlide.module.css";
import { useState } from "react";

export default function QuestionSlide() {
  const { state, dispatch } = useCreateContext();

  const [isOpen, setIsOpen] = useState(false);

  const nextHandleClick = () => {
    if (state.currentQuestion?.index === state.quiz.questions.length) {
      dispatch({ type: "OPEN_CHOSE" });
    } else {
      dispatch({ type: "OPEN_NEXT_QUESTION" });
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Вопрос {state.currentQuestion?.index}</h1>
      {isOpen && (
        <div className={styles.settings}>
          <button
            className={styles.button}
            onClick={() => dispatch({ type: "DELETE_QUESTION" })}
          >
            Удалить
          </button>
        </div>
      )}

      <div className={styles.buttons}>
        <button>Завершить создание</button>
        <button onClick={() => setIsOpen((prev) => !prev)}>Настройки</button>
        <button onClick={nextHandleClick}>Следующий</button>
      </div>

      {/* <QuestionSettings /> */}

      <QuestionTitle />

      <Media />

      <Answers />
    </div>
  );
}
