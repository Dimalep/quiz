import type { Player } from "../../../../../../../../../core/hooks/quiz-game-microservice/usePlayer";
import styles from "./PlayerItem.module.css";

interface Props {
  player: Player;
}

export default function PlayerItem({ player }: Props) {
  return (
    <div className={styles.main}>
      <span>{player.nickname}</span>
      <label>=</label>
    </div>
  );
}
