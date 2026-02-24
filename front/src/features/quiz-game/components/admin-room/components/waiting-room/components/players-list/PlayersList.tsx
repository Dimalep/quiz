import { useQuizGameAdminContext } from "../../../../../../quiz-game-context/QuizGameAdminContext";
import PlayerItem from "./components/PlayerItem";
import styles from "./PlayersList.module.css";

export default function PlayersList() {
  const { players } = useQuizGameAdminContext();

  return (
    <div className={styles.main}>
      {players?.map((p) => (
        <PlayerItem key={p.id} player={p} />
      ))}
    </div>
  );
}
