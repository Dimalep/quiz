import { useState } from "react";
import { useCreateContext } from "../../../create-context/CreateProvider";
import styles from "./SettingsSlide.module.css";
import BottomButtons from "./components/BottomButtons";
import Details from "./components/Details";

export default function SettingsSlide() {
  const { state, dispatch } = useCreateContext();

  const [title, setTitle] = useState(state.quiz.title);
  const [description, setDescription] = useState(state.quiz.description);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Настройки</h1>
        <Details />
        <div className={styles.inputForm}>
          <input
            className={styles.input}
            placeholder="Название"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) =>
              dispatch({
                type: "UPDATE_QUIZ_SETTINGS",
                payload: { data: { title } },
              })
            }
          />
          <input
            className={styles.input}
            placeholder="Описание"
            defaultValue={state.quiz.description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={(e) =>
              dispatch({
                type: "UPDATE_QUIZ_SETTINGS",
                payload: { data: { description } },
              })
            }
          />
          <input className={styles.input} placeholder="Тема" />
        </div>
        <BottomButtons />
      </div>
    </div>
  );
}
