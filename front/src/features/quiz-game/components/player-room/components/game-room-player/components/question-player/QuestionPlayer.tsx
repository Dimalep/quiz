import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import ButtonsAnswer from "./components/ButtonsAnswer";
import CheckboxAnswer from "./components/CheckboxAnswer";
import styles from "./QuestionPlayer.module.css";

export default function QuestionPlayer() {
  const { currentQuestion } = useQuizGamePlayerContext();

  if (!currentQuestion) return null;

  return (
    <div className={styles.main}>
      <div className={styles.question}>
        <span>Вопрос:</span>
        <h3>{currentQuestion.text}</h3>
      </div>
      {currentQuestion.type === "buttons" ? (
        <ButtonsAnswer answers={currentQuestion.answers} />
      ) : (
        <CheckboxAnswer answers={currentQuestion.answers} />
      )}
    </div>
  );
}
