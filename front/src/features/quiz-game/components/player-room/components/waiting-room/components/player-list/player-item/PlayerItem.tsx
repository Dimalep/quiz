import type { Player } from "../../../../../../../../../core/hooks/quiz-game-microservice/usePlayer";
import styles from "./PlayerItem.module.css";

export interface Props {
  player: Player;
}

export default function PlayerItem({ player }: Props) {
  return <div className={styles.main}>{player.nickname}</div>;
}
