import { useState } from "react";
import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./PlayerNavigation.module.css";
import type { Question } from "../../../../../../../quiz-creation/manual-create/create-context/reducer";

export default function PlayerNavigation() {
  const {
    quiz,
    currentQuestion,
    selectCurrentQuestion,
    finishGame,
    setIsEnd,
    isEnd,
  } = useQuizGamePlayerContext();

  const [isOpen, setIsOpen] = useState(false);

  const openQuestionsListHandler = () => setIsOpen((prev) => !prev);
  const finishGameHanlder = () => finishGame();
  const toAnswerHandler = (el: Question) => {
    selectCurrentQuestion(el.index);
    setIsEnd(false);
  };
  const clickToEndHandler = () => setIsEnd(true);

  if (!currentQuestion) return;

  return (
    <div className={styles.main}>
      <div className={styles.buttons}>
        <button onClick={openQuestionsListHandler}>Список вопросов</button>
        <button onClick={finishGameHanlder}>Завершить</button>
      </div>

      {isOpen && (
        <div className={styles.questions}>
          {quiz?.questions.map((el, index) => (
            <button
              className={
                !isEnd && currentQuestion.id === el.id
                  ? styles.select
                  : styles.not_select
              }
              key={index}
              onClick={() => toAnswerHandler(el)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={isEnd ? styles.select : styles.not_select}
            onClick={clickToEndHandler}
          >
            Конец
          </button>
        </div>
      )}
    </div>
  );
}
