import { useGeneratorContext } from "../../../../AiGenerateContext";
import styles from "./QuizDescription.module.css";

export default function QuizDescription() {
  const { state, dispatch } = useGeneratorContext();

  return (
    <div
      className={`${styles.main} ${!state.currentQuestion ? styles.select : ""}`}
      onClick={() => dispatch({ type: "SET_CURRENT_QUESTION_AS_NULL" })}
    >
      <h3>Описание</h3>
      <label>Название квиза: {state.quiz.title}</label>
      <label>Описание: {state.quiz.description}</label>
    </div>
  );
}
