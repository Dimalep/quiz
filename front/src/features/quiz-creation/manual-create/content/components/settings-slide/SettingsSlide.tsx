import { useEffect, useState } from "react";
import { useCreateContext } from "../../../create-context/CreateProvider";

import styles from "./SettingsSlide.module.css";
import BottomButtons from "./components/BottomButtons";
import Details from "./components/Details";

export default function SettingsSlide() {
  const { updateQuiz, quiz } = useCreateContext();

  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [thema, setThema] = useState("");

  useEffect(() => {
    updateQuiz({ title: title, description: description });
  }, [title, description, thema]);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Настройки</h1>
        <Details />
        <div className={styles.inputForm}>
          <input
            className={styles.input}
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Тема"
            value={thema}
            onChange={(e) => setThema(e.target.value)}
          />
        </div>
        <BottomButtons title={title} description={description} />
      </div>
    </div>
  );
}
