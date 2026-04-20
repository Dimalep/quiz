import type { Player } from "../../../../../../../../../core/api/quiz-game-service/usePlayer";
import First from "../../../../../../../../../shared/icons/player-icons/First";
import { useQuizGamePlayerContext } from "../../../../../../../quiz-game-context/QuizGamePlayerContext";
import styles from "./PlayerItem.module.css";

export interface Props {
  player: Player;
}

export default function PlayerItem({ player }: Props) {
  const { currentPlayer } = useQuizGamePlayerContext();

  const isMe = currentPlayer?.id === player.id;

  return (
    <div className={`${styles.main} ${isMe ? styles.me : ""}`}>
      <div className={styles.right}>
        <First />
        <label>{player.nickname}</label>
      </div>
      {isMe && <label>Я</label>}
    </div>
  );
}
