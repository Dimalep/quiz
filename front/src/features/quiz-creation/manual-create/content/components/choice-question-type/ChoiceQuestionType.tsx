import type { CSSProperties } from "react";
import ButtonType from "./components/ButtonType";

export default function ChoiceQuestionType() {
  return (
    <div style={styles.main}>
      <ButtonType title="buttons" questionType={1} />
      <ButtonType title="checkbox" questionType={2} />
      <ButtonType title="text" questionType={3} />
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  } as CSSProperties,
};
