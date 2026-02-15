import ChoiceQuestionType from "./components/choice-question-type/ChoiceQuestionType";
import { useCreateContext } from "../create-context/CreateProvider";
import QuestionSlide from "./components/quiestion-slide.tsx/QuestionSlide";
import SettingsSlide from "./components/settings-slide/SettingsSlide";
import styles from "./Content.module.css";

export default function Content() {
  const { state } = useCreateContext();

  if (state.editorMode === "settings") {
    return (
      <div className={styles.main}>
        <SettingsSlide />
      </div>
    );
  }

  if (!state.currentQuestion) {
    return (
      <div className={styles.main}>
        <ChoiceQuestionType />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <QuestionSlide />
    </div>
  );
}
