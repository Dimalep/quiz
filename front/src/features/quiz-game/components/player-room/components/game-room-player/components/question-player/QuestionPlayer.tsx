import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import ButtonsAnswer from "./components/ButtonsAnswer";
import CheckboxAnswer from "./components/CheckboxAnswer";
import styles from "./QuestionPlayer.module.css";

export default function QuestionPlayer() {
  const { currentQuestion, isEnd } = useQuizGamePlayerContext();

  if (!currentQuestion) return null;

  return (
    <div className={styles.main}>
      {!isEnd && (
        <div className={styles.question}>
          <span>Вопрос:</span>
          <h2>{currentQuestion.text}</h2>
        </div>
      )}
      {isEnd ? (
        <div className={styles.end}>
          <h3>Конец</h3>
          <h4>Нажмите заврешить, чтобы посмотреть результаты</h4>
        </div>
      ) : currentQuestion.type === "buttons" ? (
        <ButtonsAnswer answers={currentQuestion.answers} />
      ) : (
        <CheckboxAnswer answers={currentQuestion.answers} />
      )}
    </div>
  );
}
