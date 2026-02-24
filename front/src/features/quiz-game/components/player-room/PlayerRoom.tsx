import WaitingRoom from "./components/waiting-room/WaitingRoom";
import styles from "./PlayerRoom.module.css";

export default function PlayerRoom() {
  return (
    <div className={styles.main}>
      <WaitingRoom />
    </div>
  );
}
