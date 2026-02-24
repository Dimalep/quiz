import { useQuizGamePlayerContext } from "../../../../../quiz-game-context/QuizGamePlayerContext";
import PlayerItem from "./PlayerItem";
import styles from "./PlayersList.module.css";

export default function PlayersList() {
  const { players } = useQuizGamePlayerContext();

  return (
    <div className={styles.main}>
      {players?.map((e) => (
        <PlayerItem key={e.id} />
      ))}
    </div>
  );
}
