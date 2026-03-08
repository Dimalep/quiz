import styles from "./AnswerButton.module.css";
import type { Answer } from "../../../../../../../../create-context/reducer";
import { useCreateContext } from "../../../../../../../../create-context/CreateProvider";

interface Props {
  answer: Answer;
  isCorrect: boolean;
}

export default function AnswerButton({ answer, isCorrect }: Props) {
  const { dispatch } = useCreateContext();

  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: "UPDATE_ANSWER",
      payload: {
        answerIndex: answer.index,
        data: { text: value, isCorrect: isCorrect },
      },
    });
  };

  const removeHandler = () => {
    dispatch({ type: "DELETE_ANSWER", payload: { id: answer.index } });
  };

  return (
    <div
      className={
        isCorrect
          ? `${styles.main} ${styles.correclty}`
          : `${styles.main} ${styles.incorreclty}`
      }
    >
      <input
        className={styles.input}
        placeholder="Ответ"
        value={answer.text}
        onChange={textChangeHandler}
      />
      {!isCorrect && (
        <button className={styles.button} onClick={removeHandler}>
          -
        </button>
      )}
    </div>
  );
}
