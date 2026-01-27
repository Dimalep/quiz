import type { CSSProperties } from "react";
import { useCreateContext } from "../../../../../../create-context/CreateProvider";

interface Props {
  number: number;
}

export default function AnswerBlock({ number }: Props) {
  const { removeAnswer } = useCreateContext();

  const removeAnswerHandleClick = () => {
    removeAnswer(number);
  };

  return (
    <div style={styles.main}>
      <div style={styles.content}>
        <input style={styles.input} placeholder="Ответ"></input>
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
