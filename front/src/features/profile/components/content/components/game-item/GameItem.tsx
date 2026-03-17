import type { GameDTO } from "../../../../../../core/hooks/quiz-game-microservice/useGame";
import styles from "./GameItem.module.css";

interface Props {
  game: GameDTO;
}

export default function GameItem({ game }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.key}>
        <span>Ключ</span>
        {game.sessionKey}
      </div>
      <div className={styles.status}>
        <span>Статус</span>
        {game.status}
      </div>
    </div>
  );
}
