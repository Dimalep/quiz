import { useState } from "react";
import type { Answer } from "../../../../../../../create-context/reducer";
import styles from "./AnswerCheckBox.module.css";
import { useCreateContext } from "../../../../../../../create-context/CreateProvider";

interface Props {
  answer: Answer;
}

export default function AnswerCheckBox({ answer }: Props) {
  const [text, setText] = useState(answer.text);
  const [correct, setCorrect] = useState(answer.isCorrect);
  const { dispatch } = useCreateContext();

  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    dispatch({
      type: "UPDATE_ANSWER",
      payload: {
        answerIndex: answer.index,
        data: { text: value, isCorrect: correct },
      },
    });
  };

  const removeHandler = () => {
    dispatch({ type: "DELETE_ANSWER", payload: { id: answer.index } });
  };

  const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setCorrect(value);

    dispatch({
      type: "UPDATE_ANSWER",
      payload: {
        answerIndex: answer.index,
        data: { isCorrect: value, text },
      },
    });
  };

  return (
    <div>
      <span className={styles.span}>
        {correct ? "Правильный ответ" : "Неправильный ответ"}
      </span>
      <div
        className={`${styles.main} ${
          correct ? styles.correctly : styles.incorrectly
        }`}
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={correct}
          onChange={checkboxChangeHandler}
        />
        <input
          className={`${styles.input} ${
            correct ? styles.input_correctly : styles.input_incorrectly
          }`}
          value={text}
          onChange={textChangeHandler}
          placeholder="Введите ответ"
        />
        <button className={styles.button} onClick={removeHandler}>
          -
        </button>
      </div>
    </div>
  );
}
