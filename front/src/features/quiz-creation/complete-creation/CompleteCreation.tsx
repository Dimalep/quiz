import styles from "./CompleteCreation.module.css";
import CompleteSettings from "./components/CompleteSettings";
import QuizView from "./components/QuizView";
import useQuiz from "./hooks/useQuiz";

export default function CompleteCreation() {
  const { quiz } = useQuiz();
  return (
    <div className={styles.main}>
      <CompleteSettings quiz={quiz} />
      <QuizView />
    </div>
  );
}
