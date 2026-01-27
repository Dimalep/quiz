import type { CSSProperties } from "react";

export default function QuestionTitle() {
  return (
    <div style={styles.main}>
      <div style={styles.content}>
        <input style={styles.input} placeholder="Вопрос" />
      </div>
    </div>
  );
}

const styles = {
  main: { padding: "10px 20px" } as CSSProperties,
  content: {
    width: "500px",
    border: "2px solid black",
    borderRadius: "13px",
    padding: "10px",
  } as CSSProperties,
  input: {
    width: "100%",
    height: "50px",
  } as CSSProperties,
};
