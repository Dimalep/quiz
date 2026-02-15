import { useEffect, useState } from "react";
import { useCreateContext } from "../../../../../../create-context/CreateProvider";
import styles from "./AnswerBlock.module.css";
import type { Answer } from "../../../../../../create-context/reducer";

interface Props {
  answer: Answer;
}

export default function AnswerBlock({ answer }: Props) {
  const [inputAnswer, setInputAnswer] = useState(answer.text);
  const { dispatch } = useCreateContext();

  useEffect(() => {
    setInputAnswer(answer.text);
  }, [answer.text]);

  const removeHandleClick = () => {
    dispatch({ type: "DELETE_ANSWER", payload: { id: answer.id } });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputAnswer(value);

    dispatch({
      type: "UPDATE_ANSWER",
      payload: {
        answerId: answer.id,
        data: { text: value },
      },
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_ANSWER",
      payload: {
        answerId: answer.id,
        data: { isCorrectly: e.target.checked },
      },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.input_field}>
          <label>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={answer.isCorrectly}
              onBlur={handleCheckboxChange}
            />
            Отметить как верный ответ
          </label>

          <input
            className={styles.input}
            placeholder="Ответ"
            value={inputAnswer}
            onBlur={handleTextChange}
          />
        </div>

        <button className={styles.button} onClick={removeHandleClick}>
          -
        </button>
      </div>
    </div>
  );
}
