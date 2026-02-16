import AnswerButtons from "./components/buttons/AnswerButtons";
import { useCreateContext } from "../../../../../create-context/CreateProvider";
import styles from "./Answers.module.css";
import AnswerCheckBox from "./components/checkbox/AnswerCheckBox";

export default function Answers() {
  const { state, dispatch } = useCreateContext();

  const addAnswerHandleClick = () => {
    dispatch({ type: "CREATE_ANSWER" });
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {state.currentQuestion?.type === "buttons" ? (
          <AnswerButtons answers={state.currentQuestion.answers} />
        ) : (
          state?.currentQuestion?.answers.map((el) => (
            <AnswerCheckBox key={el.id} answer={el} />
          ))
        )}
        <button className={styles.button_add} onClick={addAnswerHandleClick}>
          +
        </button>
      </div>
    </div>
  );
}
