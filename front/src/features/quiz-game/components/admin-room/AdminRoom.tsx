import { useQuizGameAdminContext } from "../../quiz-game-context/QuizGameAdminContext";
import styles from "./AdminRoom.module.css";
import GameRoom from "./components/game-room-for-admin/GameRoom";
import SettingsSession from "./components/settings-session/SettingsSession";
import WaitingRoom from "./components/waiting-room/WaitingRoom";

export default function AdminRoom() {
  const { currentGame, openForConnect } = useQuizGameAdminContext();

  return (
    <div className={styles.main}>
      <SettingsSession />
      {currentGame?.status === 2 ? (
        <GameRoom />
      ) : currentGame?.status === 3 ? (
        <div>
          <button onClick={openForConnect}>Запустить снова</button>
        </div>
      ) : (
        <WaitingRoom />
      )}
    </div>
  );
}
