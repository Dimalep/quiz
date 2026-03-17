import { useEffect, useState } from "react";
import { useQuizGameAdminContext } from "../../quiz-game-context/QuizGameAdminContext";
import styles from "./AdminRoom.module.css";
import GameRoom from "./components/game-room-for-admin/GameRoom";
import SettingsSession from "./components/settings-session/SettingsSession";
import WaitingRoom from "./components/waiting-room/WaitingRoom";

export default function AdminRoom() {
  const { currentGame, restartGane } = useQuizGameAdminContext();

  const [room, setRoom] = useState<"wait" | "game">("wait");

  useEffect(() => {
    if (currentGame?.status === 2) {
      setRoom("game");
    }
  }, [currentGame]);

  if (currentGame?.status !== 3) {
    if (room === "wait")
      return (
        <div className={styles.main}>
          {currentGame?.status === 2 && (
            <button className={styles.navigation_button} onClick={() => setRoom("game")}>
              {"комната игры -->"}
            </button>
          )}
          <SettingsSession />
          <WaitingRoom />
        </div>
      );
    if (room === "game")
      return (
        <div className={styles.main}>
          {currentGame?.status === 2 && (
            <button className={styles.navigation_button} onClick={() => setRoom("wait")}>
              {"<-- комнта ожидания"}
            </button>
          )}
          <SettingsSession />
          <GameRoom />
        </div>
      );
  } else
    return (
      <div className={styles.main}>
        <button onClick={restartGane}>Запустить снова</button>
      </div>
    );
}
