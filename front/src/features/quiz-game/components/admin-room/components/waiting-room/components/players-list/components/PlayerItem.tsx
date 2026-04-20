import type { Player } from "../../../../../../../../../core/api/quiz-game-service/usePlayer";
import First from "../../../../../../../../../shared/icons/player-icons/First";
import styles from "./PlayerItem.module.css";

interface Props {
  player: Player;
}

export default function PlayerItem({ player }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.player}>
        <div className={styles.img}>
          <First />
        </div>

        <div className={styles.nickname}>
          <label>{player.nickname}</label>
        </div>
      </div>

      <button className={styles.delete_player_btn}>x</button>
    </div>
  );
}
