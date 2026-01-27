import type { CSSProperties } from "react";
import ChoiceQuestionType from "./components/choice-question-type/ChoiceQuestionType";
import { useCreateContext } from "../create-context/CreateProvider";
import QuestionSlide from "./components/quiestion-slide.tsx/QuestionSlide";
import SettingsSlide from "./components/settings-slide/SettingsSlide";

export default function Content() {
  const { editorMode, currentSlide } = useCreateContext();

  return (
    <div style={styles.main}>
      {editorMode === "settings" ? (
        <SettingsSlide />
      ) : !currentSlide ? (
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
