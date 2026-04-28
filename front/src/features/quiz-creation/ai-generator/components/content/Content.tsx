import { useGeneratorContext } from "../../AiGenerateContext";
import LoadingGenerate from "../loading/LoadingGenerate";
import QuestionBlock from "./components/QuestionBlock.tsx/QuestionBlock";
import QuizDescription from "./components/quiz-description/QuizDescription";
import styles from "./Content.module.css";

export default function Content() {
  const { state } = useGeneratorContext();

  if (state.loading) return <LoadingGenerate />;

  const questions = state.quiz?.questions ?? [];

  if (!state.loading)
    return (
      <div className={styles.main}>
        <QuizDescription />

        <div className={styles.questions}>
          <h3>Вопросы</h3>
          {questions.map((el, index) => (
            <QuestionBlock key={index} question={el} />
          ))}
        </div>
      </div>
    );
}
