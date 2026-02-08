import { useEffect, useState, type CSSProperties } from "react";
import { useCreateContext } from "../../../../../../create-context/CreateProvider";
import type { Answer } from "../../../../../../../../../core/dto/QuestionsDto";

interface Props {
  answer: Answer;
}

export default function AnswerBlock({ answer }: Props) {
  const [inputAnwer, setInputAnswer] = useState(answer.text);
  const { removeAnswer, updateAnswer } = useCreateContext();

  useEffect(() => {
    updateAnswer(answer.number, inputAnwer);
  }, [inputAnwer]);

  useEffect(() => {
    setInputAnswer(answer.text);
  }, [answer.text]);

  const removeAnswerHandleClick = () => {
    removeAnswer(answer.number);
  };

  return (
    <div style={styles.main}>
      <div style={styles.content}>
        <input
          style={styles.input}
          placeholder="Ответ"
          value={inputAnwer}
          onChange={(e) => setInputAnswer(e.target.value)}
        ></input>
        <button style={styles.button} onClick={removeAnswerHandleClick}>
          -
        </button>
      </div>
    </div>
  );
}

const styles = {
  main: { width: "100%" } as CSSProperties,
  content: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  } as CSSProperties,
  input: { width: "100%", height: "50px" } as CSSProperties,
  button: { width: "50px" } as CSSProperties,
};
