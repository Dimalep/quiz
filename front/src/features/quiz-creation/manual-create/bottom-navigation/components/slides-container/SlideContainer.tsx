import type { CSSProperties } from "react";
import { useCreateContext } from "../../../create-context/CreateProvider";
import Slide from "./components/Slide";

export default function SlideContainer() {
  const { state } = useCreateContext();
  return (
    <div style={styles.main}>
      <Slide number={0} />
      {state.quiz.questions.map((el) => (
        <Slide number={el.number} key={el.number} />
      ))}
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  } as CSSProperties,
};
