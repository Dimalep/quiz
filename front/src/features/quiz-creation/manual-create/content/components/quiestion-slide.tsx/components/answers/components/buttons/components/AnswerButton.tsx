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
      className={`${styles.main} ${
        isCorrect ? styles.correclty : styles.incorreclty
      }`}
    >
      <input
        className={`${styles.input} ${
          isCorrect ? styles.input_correct : styles.input_incorrect
        }`}
        placeholder={`${isCorrect ? "Введите правильный ответ..." : "Введите ложный ответ..."}`}
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
