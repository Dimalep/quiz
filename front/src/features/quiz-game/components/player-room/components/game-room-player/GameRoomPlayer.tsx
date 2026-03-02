import { useEffect } from "react";
import { useQuizGamePlayerContext } from "../../../../quiz-game-context/QuizGamePlayerContext";
import QuestionPlayer from "./components/question-player/QuestionPlayer";
import styles from "./GameRoomPlayer.module.css";

export default function GameRoomPlayer() {
  const { startGame, lightQuiz, selectCurrentQuestion, currentQuestion } =
    useQuizGamePlayerContext();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className={styles.main}>
      <div>
        Вопросы:{" "}
        {lightQuiz?.questionsIds.map((el) => (
          <span key={el}>{el}</span>
        ))}
      </div>
      <QuestionPlayer question={currentQuestion} />
    </div>
  );
}
