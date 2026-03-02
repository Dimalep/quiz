import { useQuizGamePlayerContext } from "../../quiz-game-context/QuizGamePlayerContext";
import GameRoomPlayer from "./components/game-room-player/GameRoomPlayer";
import WaitingRoom from "./components/waiting-room/WaitingRoom";
import styles from "./PlayerRoom.module.css";
import CompleteRoom from "./components/CompleteRoom";

/*
  currentGame:      currentProgress:
  0 - opened,         0 - waitint,
  1 - closed,         1 - in_game,
  2 - launched,       2 - completed
  3 - completed 
*/

export default function PlayerRoom() {
  const { currentGame, currentProgress } = useQuizGamePlayerContext();

  if (!currentGame || !currentProgress) {
    return <div>Loading...</div>;
  }

  if (currentGame.status === 3 || currentProgress.status === 2) {
    return <CompleteRoom />;
  }

  switch (currentProgress.status) {
    case 0:
      return (
        <div className={styles.main}>
          <WaitingRoom />
        </div>
      );
    case 1:
      return (
        <div className={styles.main}>
          <GameRoomPlayer />
        </div>
      );
    default:
      return <div>Unknown status</div>;
  }
}
