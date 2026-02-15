import AnswerBlock from "./components/AnswerBlock";
import { useCreateContext } from "../../../../../create-context/CreateProvider";
import styles from "./Answers.module.css";

export default function Answers() {
  const { state, dispatch } = useCreateContext();

  const addAnswerHandleClick = () => {
    dispatch({ type: "CREATE_ANSWER" });
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {state?.currentQuestion?.answers.map((el) => (
          <AnswerBlock key={el.id} answer={el} />
        ))}
        <button className={styles.button_add} onClick={addAnswerHandleClick}>
          +
        </button>
      </div>
    </div>
  );
}
