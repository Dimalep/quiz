import type { CSSProperties } from "react";
import ChoiceQuestionType from "./components/choice-question-type/ChoiceQuestionType";
import { useCreateContext } from "../CreateProvider";
import QuestionSlide from "./components/quiestion-slide.tsx/QuestionSlide";

export default function Content() {
  const { currentQuestionId } = useCreateContext();

  return (
    <div style={styles.main}>
      {currentQuestionId === 0 ? (
        <ChoiceQuestionType />
      ) : (
        <QuestionSlide />
      )}
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    width: "100%",
    minHeight: "60vh",
    justifyContent: "center",
  } as CSSProperties,
};
