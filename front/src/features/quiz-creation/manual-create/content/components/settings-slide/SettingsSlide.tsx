import { useState, type CSSProperties } from "react";
import { useCreateContext } from "../../../create-context/CreateProvider";

export default function SettingsSlide() {
  const { openSlide, updateQuiz, quiz } = useCreateContext();

  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [thema, setThema] = useState("");

  const applyHandleClick = () => {
    updateQuiz({ title: title, description: description });
  };

  const nextHandleClick = () => {
    openSlide(1);
  };

  return (
    <div style={styles.main}>
      <div style={styles.content}>
        <input
          style={styles.input}
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Тема"
          value={thema}
          onChange={(e) => setThema(e.target.value)}
        />
        <div style={styles.buttons}>
          <button onClick={applyHandleClick}>Применить</button>
          <button onClick={nextHandleClick}>Следующий</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "70%",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  } as CSSProperties,
  input: {
    width: "400px",
    height: "50px",
  } as CSSProperties,
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
  } as CSSProperties,
};
