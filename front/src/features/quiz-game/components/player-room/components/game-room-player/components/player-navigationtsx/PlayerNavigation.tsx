import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./PlayerNavigation.module.css";

export default function PlayerNavigation() {
  const { quiz, currentQuestion, selectCurrentQuestion, finishGame } =
    useQuizGamePlayerContext();

  if (!currentQuestion) return;

  const selectQuestionHandler = (el: number) => {
    selectCurrentQuestion(el);
  };

  return (
    <div className={styles.main}>
      Вопросы:
      {quiz?.questions.map((el) => (
        <button
          className={
            currentQuestion?.index === el.index
              ? styles.selected
              : styles.button
          }
          onClick={() => selectQuestionHandler(el.index)}
          key={el.index}
        >
          {el.index}
        </button>
      ))}
      <button onClick={() => finishGame()}>Завершить</button>
    </div>
  );
}
