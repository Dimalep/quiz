import { useState } from "react";
import { useQuizGameAdminContext } from "../../../../quiz-game-context/QuizGameAdminContext";
import PlayersList from "./components/players-list/PlayersList";
import styles from "./WaitingRoom.module.css";
import { QRCodeSVG } from "qrcode.react";
import MainContainerGame from "../../../../common-components/main-container-game/MainContainerGame";
import AccessToGame from "./components/access-to-game/AccessToGame";

export default function WaitingRoom() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentGame, closeForConnect, openForConnect, infoAbouQuiz } =
    useQuizGameAdminContext();

  const qrClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.main}>
      {/* description */}
      <MainContainerGame title="Описание" mainMarginBottom={0}>
        {/*  */}
        <div className={styles.description}>
          <span>Название</span>
          {infoAbouQuiz?.title}
        </div>
        <div className={styles.description}>
          <span>Макс. количество вопросв</span>
          {infoAbouQuiz?.quantityQuestions}
        </div>
        <div className={styles.description}>
          <span>Описание</span>
          {infoAbouQuiz?.description}
        </div>

        <AccessToGame />
      </MainContainerGame>

      <PlayersList />
    </div>
  );
}
