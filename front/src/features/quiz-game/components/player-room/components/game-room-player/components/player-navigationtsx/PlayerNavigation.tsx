import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./PlayerNavigation.module.css";

export default function PlayerNavigation() {
  const { lightQuiz, currentQuestion, selectCurrentQuestion, finishGame } =
    useQuizGamePlayerContext();

  if (!currentQuestion) return;

  const selectQuestionHandler = (el: number) => {
    selectCurrentQuestion(el);
  };

  return (
    <div className={styles.main}>
      Вопросы:
      {lightQuiz?.questionsIds.map((el) => (
        <button
          className={
            currentQuestion?.questionId === el ? styles.selected : styles.button
          }
          onClick={() => selectQuestionHandler(el)}
          key={el}
        >
          {el}
        </button>
      ))}
      <button onClick={() => finishGame()}>Завершить</button>
    </div>
  );
}
