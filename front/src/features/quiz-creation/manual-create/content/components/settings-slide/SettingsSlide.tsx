import { useState } from "react";
import { useCreateContext } from "../../../create-context/CreateProvider";
import styles from "./SettingsSlide.module.css";
import ShortTextBox from "../../../../common/input/ShortTextBox";
import LongTextBox from "../../../../common/input/LongTextBox";

export default function SettingsSlide() {
  const { state, dispatch } = useCreateContext();

  const [title, setTitle] = useState(state.quiz.title);
  const [description, setDescription] = useState(state.quiz.description);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Настройки</h1>

      <div className={styles.nav_btns}>
        <button className={styles.delete_quiz}>Удалить квиз</button>
        <button
          className={styles.next}
          onClick={() => dispatch({ type: "OPEN_NEXT_QUESTION" })}
        >
          Следующий
        </button>
      </div>

      <div className={styles.details}>
        <div>
          <span>Количество вопросов: </span>
          <label>{state.quiz.questions.length}</label>
        </div>
      </div>

      <div className={styles.inputForm}>
        <ShortTextBox
          placeholder="Введите название квиза..."
          value={title}
          setValue={setTitle}
          onBlur={() =>
            dispatch({
              type: "UPDATE_QUIZ",
              payload: { data: { title } },
            })
          }
          title="Нзвание"
        />

        <LongTextBox
          placeholder="Ввдите описание квиза"
          value={description}
          setValue={setDescription}
          onBlur={() =>
            dispatch({
              type: "UPDATE_QUIZ",
              payload: { data: { description } },
            })
          }
          title="Описание"
        />
      </div>
    </div>
  );
}
