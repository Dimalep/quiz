import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import ButtonsAnswer from "./components/ButtonsAnswer";
import styles from "./QuestionPlayer.module.css";

export default function QuestionPlayer() {
  const { currentQuestion } = useQuizGamePlayerContext();

  if (!currentQuestion) return;

  return (
    <div className={styles.main}>
      <span>Вопрос:</span>
      <h3>{currentQuestion.title}</h3>
      <ButtonsAnswer answers={currentQuestion.answers} />
    </div>
  );
}
