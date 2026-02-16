import { useState } from "react";
import type { Answer } from "../../../../../../../create-context/reducer";
import styles from "./AnswerCheckBox.module.css";
import { useCreateContext } from "../../../../../../../create-context/CreateProvider";

interface Props {
  answer: Answer;
}

export default function AnswerCheckBox({ answer }: Props) {
  const [text, setText] = useState(answer.text);
  const [correct, setCorrect] = useState(answer.isCorrectly);
  const { dispatch } = useCreateContext();

  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    dispatch({
      type: "UPDATE_ANSWER",
      payload: {
        answerId: answer.id,
        data: { text: value, isCorrectly: correct },
      },
    });
  };

  const removeHandler = () => {
    dispatch({ type: "DELETE_ANSWER", payload: { id: answer.id } });
  };

  const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setCorrect(value);

    dispatch({
      type: "UPDATE_ANSWER",
      payload: {
        answerId: answer.id,
        data: { isCorrectly: value },
      },
    });
  };

  return (
    <>
      <span className={styles.span}>
        {correct ? "Правильный ответ" : "Неправильный ответ"}
      </span>
      <div
        className={
          correct
            ? `${styles.main} ${styles.correctly}`
            : `${styles.main} ${styles.incorrectly}`
        }
      >
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={correct}
          onChange={checkboxChangeHandler}
        />
        <input
          className={styles.input}
          value={text}
          onChange={textChangeHandler}
        />
        <button className={styles.button} onClick={removeHandler}>
          -
        </button>
      </div>
    </>
  );
}
