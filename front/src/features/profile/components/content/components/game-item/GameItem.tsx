import type { GameDTO } from "../../../../../../core/hooks/quiz-game-microservice/useGame";
import useConvertGameStatus from "../../../../../../core/hooks/useConvertGameStatus";
import { useProfileContext } from "../../../../ProfileProvider";
import styles from "./GameItem.module.css";

interface Props {
  game: GameDTO;
}

export default function GameItem({ game }: Props) {
  const { statusToString } = useConvertGameStatus();
  const { openGame, openGameResults } = useProfileContext();

  const openGameResultsHandler = () => {
    openGameResults(game.sessionKey);
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.key}>
          <span>Ключ</span>
          {game.sessionKey}
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
