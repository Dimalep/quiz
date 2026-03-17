import styles from "./WaitingRoom.module.css";
import PlayersList from "./components/PlayersList";
import { useQuizGamePlayerContext } from "../../../../quiz-game-context/QuizGamePlayerContext";
import ConnectInfo from "../../../common/connect-info/ConnectInfo";
import PlayerSettings from "./components/PlayerSettings";

export default function WaitingRoom() {
  const { currentGame, quiz, startGame, currentPlayer } =
    useQuizGamePlayerContext();

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
          <span>Название квиза: {quiz?.title}</span>
          <span>Описание: {quiz?.description}</span>
          <span>Количество вопросов: {quiz?.quantityQuestions}</span>
          <span>status: {currentGame?.status}</span>
        </div>

        <PlayerSettings />

        <ConnectInfo
          sessionKey={currentGame?.sessionKey}
          url={`http://localhost:5173/quiz/game/${currentGame?.sessionKey}`}
        />
      </div>

      <PlayersList />
    </div>
  );
}
