import { QRCodeSVG } from "qrcode.react";
import styles from "./WaitingRoom.module.css";
import PlayersList from "./components/PlayersList";
import { useQuizGamePlayerContext } from "../../../../quiz-game-context/QuizGamePlayerContext";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  setIsStart: Dispatch<SetStateAction<boolean>>;
}

export default function WaitingRoom({ setIsStart }: Props) {
  const quizUrl = `http://localhost:5173/quiz/game/${2}`;
  const { currentGame, lightQuiz } = useQuizGamePlayerContext();

  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <div>
          <button>Закончить</button>
          <button onClick={() => setIsStart(true)}>Приступить к решению</button>
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
