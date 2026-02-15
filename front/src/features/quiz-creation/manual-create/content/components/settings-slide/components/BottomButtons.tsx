import { useCreateContext } from "../../../../create-context/CreateProvider";
import styles from "./ButtomButtons.module.css";


export default function BottomButtons() {
  const { dispatch } = useCreateContext();

  const applyHandleClick = () => {
    // updateQuiz({ title: title, description: description });
  };

  const nextHandleClick = () => {
    dispatch({ type: "OPEN_CHOSE" });
  };

  return (
    <div className={styles.main}>
      <button onClick={applyHandleClick}>Применить</button>
      <button onClick={nextHandleClick}>Следующий</button>
    </div>
  );
}
