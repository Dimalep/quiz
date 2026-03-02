import QuestionPlayer from "./components/question-player/QuestionPlayer";
import styles from "./GameRoomPlayer.module.css";
import PlayerNavigation from "./components/player-navigationtsx/PlayerNavigation";

export default function GameRoomPlayer() {
  return (
    <div className={styles.main}>
      <PlayerNavigation />
      <QuestionPlayer />
    </div>
  );
}
