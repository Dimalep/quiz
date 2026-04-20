import { useState } from "react";
import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./PlayerNavigation.module.css";

export default function PlayerNavigation() {
  const { finishGame, currentProgress, selectCurrentQuestion, setIsEdit } =
    useQuizGamePlayerContext();

  const [isOpen, setIsOpen] = useState(false);

  const history = currentProgress?.questionResultHistory ?? [];
  const isEmptyProgress = history.length === 0;

  const openQuestionsListHandler = () => setIsOpen((prev) => !prev);
  const finishGameHanlder = () => finishGame();
  const selectQuestionHandler = (selectedQuestionId: string) => {
    selectCurrentQuestion(selectedQuestionId);
  };

  return (
    <div className={styles.main}>
      <div className={styles.buttons}>
        <button onClick={openQuestionsListHandler}>Прошлые вопросы</button>

        <button onClick={finishGameHanlder}>Завершить</button>
      </div>

      {isOpen && (
        <div className={styles.questions}>
          {!isEmptyProgress ? (
            history.map((q, index) => (
              <button key={q.id} onClick={() => selectQuestionHandler(q.id)}>
                {index + 1}
              </button>
            ))
          ) : (
            <div>Нет истории ответов</div>
          )}
        </div>
      )}
    </div>
  );
}
