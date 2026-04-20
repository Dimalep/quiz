import { useQuizGamePlayerContext } from "../../quiz-game-context/QuizGamePlayerContext";
import GameRoomPlayer from "./components/game-room-player/GameRoomPlayer";
import WaitingRoom from "./components/waiting-room/WaitingRoom";
import styles from "./PlayerRoom.module.css";

/*
  currentGame:      currentProgress:
  0 - opened,         0 - waiting,
  1 - closed,         1 - in_game,
  2 - launched,       2 - completed
  3 - completed 
*/

export default function PlayerRoom() {
  const { currentGame, currentProgress, finishGame } =
    useQuizGamePlayerContext();

  if (!currentGame || !currentProgress) {
    return <div>Loading...</div>;
  }

  if (
    // currentGame.status === "launched" ||
    currentProgress.status === "completed"
  ) {
    finishGame();
  }

  switch (currentProgress.status) {
    case "waiting":
      return (
        <div className={styles.main}>
          <div className={styles.content}>
            <WaitingRoom />
          </div>
        </div>
      );
    case "in_game":
      return (
        <div className={styles.main}>
          <div className={styles.content}>
            <GameRoomPlayer />
          </div>
        </div>
      );
    default:
      return <div>Unknown status</div>;
  }
}
