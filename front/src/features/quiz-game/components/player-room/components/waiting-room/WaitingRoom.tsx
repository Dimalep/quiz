import { QRCodeSVG } from "qrcode.react";
import styles from "./WaitingRoom.module.css";
import PlayersList from "./components/PlayersList";
import { useQuizGamePlayerContext } from "../../../../quiz-game-context/QuizGamePlayerContext";

export default function WaitingRoom() {
  const quizUrl = `http://localhost:5173/quiz/game/${2}`;
  const { currentGame, lightQuiz, startGame } = useQuizGamePlayerContext();

  const startGameHandler = async () => {
    if (currentGame?.status !== 2) alert("Игра еще не запущена админом");
    else startGame();
  };

  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <div>
          <button>Закончить</button>
          <button onClick={startGameHandler}>Приступить к решению</button>
        </div>
        <div className={styles.info}>
          <h3>Описание</h3>
          <span>Название квиза: {lightQuiz?.title}</span>
          <span>Описание: {lightQuiz?.description}</span>
          <span>Количество вопросов: {lightQuiz?.quantityQuestions}</span>
          <span>status: {currentGame?.status}</span>
        </div>

        <div className={styles.connect}>
          <h4>sessoinKey</h4>
          <QRCodeSVG value={quizUrl} size={256}></QRCodeSVG>
        </div>
      </div>

      <PlayersList />
    </div>
  );
}
