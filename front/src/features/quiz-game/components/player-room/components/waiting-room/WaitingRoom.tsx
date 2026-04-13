import styles from "./WaitingRoom.module.css";
import PlayersList from "./components/player-list/PlayersList";
import { useQuizGamePlayerContext } from "../../../../quiz-game-context/QuizGamePlayerContext";
import PlayerSettings from "./components/player-settings/PlayerSettings";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export default function WaitingRoom() {
  const [isOpen, setIsOpen] = useState(false);

  const qrClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const { currentGame, quiz, startGame, currentPlayer } =
    useQuizGamePlayerContext();

  const startGameHandler = async () => {
    // if (currentGame?.status !== 2) alert("Игра еще не запущена админом");
    // else startGame();
    startGame();
  };

  return (
    <div className={styles.main}>
      <div className={styles.buttons}>
        <button>Выйти</button>
        <button onClick={startGameHandler}>Приступить к решению</button>
      </div>

      <div className={styles.description}>
        <h3>Описание</h3>
        <span>Название квиза: {quiz?.title}</span>
        <span>Описание: {quiz?.description}</span>
        <span>Количество вопросов: {quiz?.quantityQuestions}</span>
        <span>status: {currentGame?.status}</span>
      </div>

      <div className={styles.access}>
        <div className={styles.access_info}>
          <div className={styles.session_code}>
            <span>Ключ</span>
            <h3>{currentGame?.sessionKey}</h3>
          </div>

          <div className={styles.qr_code}>
            <label onClick={qrClickHandler}>QR</label>
          </div>
        </div>

        {isOpen && (
          <div className={styles.qr}>
            <QRCodeSVG
              value={`http://localhost:5173/quiz/game/player/${currentGame?.sessionKey}`}
              size={256}
            ></QRCodeSVG>
          </div>
        )}
      </div>

      <PlayerSettings />

      <PlayersList />
    </div>
  );
}
