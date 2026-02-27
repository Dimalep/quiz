import { useQuizGamePlayerContext } from "../../quiz-game-context/QuizGamePlayerContext";
import GameRoomPlayer from "./components/game-room-player/GameRoomPlayer";
import WaitingRoom from "./components/waiting-room/WaitingRoom";
import styles from "./PlayerRoom.module.css";

export default function PlayerRoom() {
  const { currentGame } = useQuizGamePlayerContext();

  if (currentGame?.status !== 2)
    return (
      <div className={styles.main}>
        <WaitingRoom />
      </div>
    );
  if (currentGame?.status === 2)
    return (
      <div className={styles.main}>
        <GameRoomPlayer />
      </div>
    );
}
