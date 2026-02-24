import { useQuizGameAdminContext } from "../../quiz-game-context/QuizGameAdminContext";
import styles from "./AdminRoom.module.css";
import GameRoom from "./components/game-room-for-admin/GameRoom";
import WaitingRoom from "./components/waiting-room/WaitingRoom";

export default function AdminRoom() {
  const { gameStatus } = useQuizGameAdminContext();

  if (gameStatus === "wait")
    return (
      <div className={styles.main}>
        <WaitingRoom />
      </div>
    );

  if (gameStatus === "play")
    return (
      <div className={styles.main}>
        <GameRoom />
      </div>
    );
}
