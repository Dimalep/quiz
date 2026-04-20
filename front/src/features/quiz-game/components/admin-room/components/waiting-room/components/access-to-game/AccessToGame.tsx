import { useState } from "react";
import { useQuizGameAdminContext } from "../../../../../../quiz-game-context/QuizGameAdminContext";
import styles from "./AccessToGame.module.css";
import { QRCodeSVG } from "qrcode.react";

export default function AccessToGame() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentGame, closeForConnect, openForConnect } =
    useQuizGameAdminContext();

  const accessButton =
    currentGame?.status === "opened" ? (
      <button className={styles.access_button} onClick={closeForConnect}>
        Закрыть
      </button>
    ) : (
      <button onClick={openForConnect}>Открыть</button>
    );

  return (
    <div>
      {/* access */}
      <div className={styles.access}>
        <div className={styles.access_status}>
          <div>
            <span>Статус</span>
            <h4>{currentGame?.status}</h4>
          </div>
          {currentGame?.status !== "launched" && accessButton}
        </div>

        <div className={styles.access_info}>
          <div className={styles.session_code}>
            <span>Ключ</span>
            <h3>{currentGame?.key}</h3>
          </div>

          <div className={styles.qr_code}>
            <label onClick={() => setIsOpen((prev) => !prev)}>QR</label>
          </div>
        </div>

        {isOpen && (
          <div className={styles.qr}>
            <QRCodeSVG
              value={`http://localhost:5173/quiz/game/player/${currentGame?.key}`}
              size={256}
            ></QRCodeSVG>
          </div>
        )}
      </div>
    </div>
  );
}
