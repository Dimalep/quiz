import { useQuizGamePlayerContext } from "../../../../../../quiz-game-context/QuizGamePlayerContext";
import PlayerItem from "./player-item/PlayerItem";
import styles from "./PlayersList.module.css";

export default function PlayersList() {
  const { players } = useQuizGamePlayerContext();

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <span>Список игроков</span>
        <span>{players?.length}</span>
      </div>
      {players?.map((e) => (
        <PlayerItem key={e.id} player={e} />
      ))}
    </div>
  );
}
