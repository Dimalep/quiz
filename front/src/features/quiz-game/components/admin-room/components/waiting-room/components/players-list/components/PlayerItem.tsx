import type { Player } from "../../../../../../../../../core/hooks/quiz-game-microservice/usePlayer";
import styles from "./PlayerItem.module.css";

interface Props {
  player: Player;
}

export default function PlayerItem({ player }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.player}>
        <div>1</div>
        <span>{player.nickname}</span>
      </div>
      <label>=</label>
    </div>
  );
}
