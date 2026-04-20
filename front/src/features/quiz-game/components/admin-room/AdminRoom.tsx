import { useEffect, useState } from "react";
import { useQuizGameAdminContext } from "../../quiz-game-context/QuizGameAdminContext";
import styles from "./AdminRoom.module.css";
import GameRoom from "./components/game-room-for-admin/GameRoom";
import SettingsSession from "./components/settings-session/SettingsSession";
import WaitingRoom from "./components/waiting-room/WaitingRoom";

export default function AdminRoom() {
  const { currentGame, openGameResults } = useQuizGameAdminContext();

  const [room, setRoom] = useState<"wait" | "game">("wait");

  useEffect(() => {
    if (currentGame?.status === "launched") {
      setRoom("game");
    }
  }, [currentGame]);

  if (currentGame?.status === "completed") openGameResults();
  if (currentGame?.status !== "completed")
    return (
      <div className={styles.main}>
        <div className={styles.content}>
          <h3>{currentGame === undefined && "Проблемы с соедениением"}</h3>

          {/* Navigation */}
          <div className={styles.navigation}>
            <button
              className={`${styles.go_to_info_btn} ${
                room === "wait"
                  ? styles.active_navigation_btn
                  : styles.inactive_navigation_btn
              }`}
              onClick={() => setRoom("wait")}
            >
              Информация
            </button>

            <button
              className={`${styles.go_to_results_btn} ${
                room === "game"
                  ? styles.active_navigation_btn
                  : styles.inactive_navigation_btn
              }`}
              onClick={() => setRoom("game")}
            >
              Результаты
            </button>
          </div>

          <SettingsSession />

          {room === "game" ? <GameRoom /> : <WaitingRoom />}
        </div>
      </div>
    );
}
