import { useState } from "react";
import { useQuizGameAdminContext } from "../../../../quiz-game-context/QuizGameAdminContext";
import PlayersList from "./components/players-list/PlayersList";
import styles from "./WaitingRoom.module.css";
import { QRCodeSVG } from "qrcode.react";

export default function WaitingRoom() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentGame, closeForConnect, openForConnect } =
    useQuizGameAdminContext();

  const qrClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const convertStatus = (value: number | undefined): string => {
    if (value === 0) return "Комната открыта";
    else if (value === 1) return "Комната закрыта";
    else if (value === 2) return "Игра запущена";
    return "";
  };

  const accessButton =
    currentGame?.status === 0 ? (
      <button className={styles.access_button} onClick={closeForConnect}>
        Закрыть
      </button>
    ) : (
      <button onClick={openForConnect}>Открыть</button>
    );

  return (
    <div className={styles.main}>
      {/* description */}
      <div className={styles.description}>
        <span>Описание</span>
        {currentGame?.quizId}
      </div>

      {/* access */}
      <div className={styles.access}>
        <div className={styles.access_status}>
          <div>
            <span>Статус</span>
            <h4>{convertStatus(currentGame?.status)}</h4>
          </div>
          {accessButton}
        </div>

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

      <PlayersList />
    </div>
  );
}
