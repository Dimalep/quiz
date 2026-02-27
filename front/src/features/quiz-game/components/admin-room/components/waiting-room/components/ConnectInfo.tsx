import { useState } from "react";
import { useQuizGameAdminContext } from "../../../../../quiz-game-context/QuizGameAdminContext";
import styles from "./ConnectInfo.module.css";
import { QRCodeSVG } from "qrcode.react";

export default function ConnectInfo() {
  const { currentGame, sessionKey } = useQuizGameAdminContext();
  const quizUrl = `http://localhost:5173/quiz/game/${currentGame?.sessionKey}`;

  const [isShowQr, setIsShowQr] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.session_info}>
        <div className={styles.session_key}>
          <h4>Код комнаты:</h4>
          <div className={styles.key}>
            <span>{sessionKey}</span>
          </div>
          <div
            className={styles.button_qr}
            onClick={() => setIsShowQr((prev) => !prev)}
          >
            QR
          </div>
        </div>
      </div>
      {isShowQr && (
        <div className={styles.qr}>
          <QRCodeSVG value={quizUrl} size={256}></QRCodeSVG>
        </div>
      )}
    </div>
  );
}
