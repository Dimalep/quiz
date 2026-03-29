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
    <>
      <h3 className={styles.title}>Ответы</h3>
      <div className={styles.main}>
        {state.currentQuestion?.type === "buttons" ? (
          <AnswerButtons answers={state.currentQuestion.answers} />
        ) : (
          state?.currentQuestion?.answers.map((el) => (
            <AnswerCheckBox key={el.index} answer={el} />
          ))
        )}
        <button className={styles.button_add} onClick={addAnswerHandleClick}>
          Добавить ответ
        </button>
      </div>
    </>
  );
}
