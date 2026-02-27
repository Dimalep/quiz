import { useQuizGameAdminContext } from "../../quiz-game-context/QuizGameAdminContext";
import styles from "./AdminRoom.module.css";
import GameRoom from "./components/game-room-for-admin/GameRoom";
import WaitingRoom from "./components/waiting-room/WaitingRoom";

export default function AdminRoom() {
  const { currentGame } = useQuizGameAdminContext();

  if (currentGame?.status !== 2)
    return (
      <div className={styles.main}>
        <WaitingRoom />
      </div>
    );

  if (currentGame?.status === 2)
    return (
      <div className={styles.main}>
        <GameRoom />
      </div>
    );
}
