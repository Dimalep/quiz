import type {
  Game,
  GameDTO,
} from "../../../../../../core/api/quiz-game-service/useGame";
import useConvertGameStatus from "../../../../../../core/api/useConvertGameStatus";
import { useProfileContext } from "../../../../ProfileProvider";
import styles from "./GameItem.module.css";

interface Props {
  game: Game;
}

export default function GameItem({ game }: Props) {
  const { statusToString } = useConvertGameStatus();
  const { openGame, openGameResults } = useProfileContext();

  const openGameResultsHandler = () => {
    openGameResults(game.sessionKey);
  };

  const formattedDate = new Date(game.createAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.key}>
          <span>ID</span>
          {game.id}
        </div>
        <div className={styles.key}>
          <span>Дата создания</span>
          {formattedDate}
        </div>
        <div className={styles.status}>
          <span>Статус</span>
          {statusToString(game.status)}
        </div>
      </div>
      <div>
        {game.status === 2 && (
          <div className={styles.buttons}>
            <button onClick={() => openGame(game)}>Перейти</button>
            <button>Завершить</button>
          </div>
        )}
        {game.status === 3 && (
          <button onClick={openGameResultsHandler}>Результаты</button>
        )}
      </div>
    </div>
  );
}
