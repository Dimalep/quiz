import { QRCodeSVG } from "qrcode.react";
import styles from "./WaitingRoom.module.css";
import PlayersList from "./components/PlayersList";

export default function WaitingRoom() {
  const quizUrl = `http://localhost:5173/quiz/game/${2}`;

  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <div>
          <button>Завершить</button>
          <button>Начать</button>
        </div>
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
