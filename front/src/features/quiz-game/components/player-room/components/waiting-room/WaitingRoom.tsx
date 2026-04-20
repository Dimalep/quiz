import styles from "./WaitingRoom.module.css";
import PlayersList from "./components/player-list/PlayersList";
import { useQuizGamePlayerContext } from "../../../../quiz-game-context/QuizGamePlayerContext";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import Settings from "./components/settings/Settings";
import MainContainerGame from "../../../../common-components/main-container-game/MainContainerGame";

export default function WaitingRoom() {
  const [isOpen, setIsOpen] = useState(false);

  const qrClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const { currentGame, infoAboutQuiz } = useQuizGamePlayerContext();

  return (
    <div className={styles.main}>
      <Settings />

      <MainContainerGame title="Описание">
        <div className={styles.content}>
          <div className={styles.description}>
            <span>Название квиза: {infoAboutQuiz?.title}</span>
            <span>Описание: {infoAboutQuiz?.description}</span>
            <span>Количество вопросов: {infoAboutQuiz?.quantityQuestions}</span>
            <span>status: {currentGame?.status}</span>
          </div>

          <div className={styles.access}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className={styles.session_key}>
                <span>Ключ</span>
                <label>{currentGame?.key}</label>
              </div>

              <div className={styles.qr_code}>
                <label onClick={qrClickHandler}>QR</label>
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
      </MainContainerGame>

      <PlayersList />
    </div>
  );
}
