import { useQuizGameAdminContext } from "../../../../quiz-game-context/QuizGameAdminContext";
import PlayersList from "./components/players-list/PlayersList";
import styles from "./WaitingRoom.module.css";
import { QRCodeSVG } from "qrcode.react";

export default function WaitingRoom() {
  const quizUrl = `http://localhost:5173/quiz/game/${2}`;
  const { startGame } = useQuizGameAdminContext();

  const startGameHandler = () => {
    startGame();
  };

  return (
    <div className={styles.main}>
      <div className={styles.buttons}>
        <button>Завершить игру</button>
        <button onClick={startGameHandler}>Запустить игру</button>
      </div>

      <div className={styles.description}>
        <div className={styles.info}>
          <h3>Описание</h3>
          <span>Data</span>
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
