import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import ButtonsAnswer from "./components/ButtonsAnswer";
import CheckboxAnswer from "./components/CheckboxAnswer";
import styles from "./QuestionPlayer.module.css";

export default function QuestionPlayer() {
  const { currentQuestion } = useQuizGamePlayerContext();

  if (!currentQuestion) return null;

  return (
    <div className={styles.main}>
      <span>Вопрос:</span>
      <h3>{currentQuestion.title}</h3>
      {currentQuestion.type === "buttons" ? (
        <ButtonsAnswer answers={currentQuestion.answers} />
      ) : (
        <CheckboxAnswer answers={currentQuestion.answers} />
      )}
    </div>
  );
}
