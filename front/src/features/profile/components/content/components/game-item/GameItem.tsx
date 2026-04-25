import { useState } from "react";
import type { GameHistory } from "../../../../../../core/api/quiz-game-service/useGame";
import GameIco from "../../../../../../shared/icons/Game";
import { useProfileContext } from "../../../../ProfileProvider";
import styles from "./GameItem.module.css";

interface Props {
  game: GameHistory;
}

export default function GameItem({ game }: Props) {
  const { openGame, openGameResults, deleteByIdHandler, completeByIdHandler } =
    useProfileContext();

  const [isOpen, setIsOpen] = useState(false);

  const openGameResultsHandler = () => {
    openGameResults(game.key);
  };

  const formattedDate = new Date(game.createAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedDateComplete = new Date(game.completeAt).toLocaleString(
    "ru-RU",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );

  return (
    <div className={styles.main}>
      <div className={styles.info}>
        <div className={styles.ico}>
          <GameIco />
        </div>

        <div>
          <label className={styles.title}>{game.quiz.title}</label>
          <label className={styles.description}>{game.quiz.description}</label>
        </div>
      </div>

      <div className={styles.data}>
        <label>Создан: {formattedDate}</label>
        <label>Завершён: {formattedDateComplete}</label>
        <label>вопросов: {game.quiz.quantityQuestion}</label>
      </div>

      <div className={styles.statistics}>
        <label className={styles.avg_res}>{Math.round(game.avgResult)}%</label>
        <label className={styles.avg_res_title}>средний результат</label>
      </div>

      <div>
        <label>ID: {game.id}</label>
      </div>

      <div
        className={`${styles.status} ${game.status === "opened" ? styles.opened : game.status === "launched" ? styles.launched : game.status === "completed" ? styles.completed : styles.closed}`}
      >
        статус: {game.status}
      </div>

      <label
        className={styles.dropdown_btn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ⋮
      </label>

      {isOpen && (
        <div
          className={styles.dropdown}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {game.status === "launched" && (
            <>
              <button onClick={() => openGame(game.key)}>Перейти</button>
              <button onClick={() => completeByIdHandler(game.id)}>
                Завершить
              </button>
            </>
          )}
          {game.status === "opened" && (
            <>
              <button onClick={() => openGame(game.key)}>Перейти</button>
              <button onClick={() => completeByIdHandler(game.id)}>
                Завершить
              </button>
            </>
          )}
          {game.status === "completed" && (
            <button onClick={openGameResultsHandler}>
              Посмотреть результаты
            </button>
          )}
          <button onClick={() => deleteByIdHandler(game.id)}>
            Удалить из списка
          </button>
        </div>
      )}
    </div>
  );
}
