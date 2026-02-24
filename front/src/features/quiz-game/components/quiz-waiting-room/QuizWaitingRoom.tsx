// import QuizGameSettings from "../admin-room/QuizGameSettings";
import ConnectedUsers from "./components/connected-users/ConnectedUsers";
import InfoForConnect from "./components/info-for-connect/InfoForConnect";
import styles from "./QuizWaitingRoom.module.css";

export default function QuizWaitingRoom() {
  // const { player } = useQuizGameContext();

  return (
    <div className={styles.main}>
      {/* {player.role == "admin" && <QuizGameSettings />} */}
      <InfoForConnect />
      <ConnectedUsers />
    </div>
  );
}
