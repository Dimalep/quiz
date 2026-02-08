import { type CSSProperties } from "react";
import ChoiceQuestionType from "./components/choice-question-type/ChoiceQuestionType";
import { useCreateContext } from "../create-context/CreateProvider";
import QuestionSlide from "./components/quiestion-slide.tsx/QuestionSlide";
import SettingsSlide from "./components/settings-slide/SettingsSlide";

export default function Content() {
  const { editorMode, currentSlide } = useCreateContext();

  if (editorMode === "settings") {
    return (
      <div style={styles.main}>
        <SettingsSlide />
      </div>
    );
  }

  if (!currentSlide) {
    return (
      <div style={styles.main}>
        <ChoiceQuestionType />
      </div>
    );
  }

  return (
    <div style={styles.main}>
      <QuestionSlide />
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
