import MainContainerGame from "../../common-components/main-container-game/MainContainerGame";
import BigResultList from "./components/BigResultList";
import styles from "./GameResults.module.css";
import useGameResults from "./useGameResults";

export default function GameResults() {
  const { progresses, goToMain } = useGameResults();

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <button className={styles.gotomain} onClick={goToMain}>
          На главную
        </button>

        <MainContainerGame title="Информация о квизе" mainMarginTop={20}>
          <div>
            <span>Идентификатор квиза: </span>
            <label>quiz id</label>
          </div>
          <div>
            <span>Название квиза: </span>
            <label>quiz name</label>
          </div>
        </MainContainerGame>

        <MainContainerGame title="Общая статистика">
          <div>
            <span>Количество игроков: </span>
            <label>{progresses?.length}</label>
          </div>
          <div>
            <span>Средний результат: </span>
            <label>30%</label>
          </div>
          <div>
            <span>Среднее время выполения: </span>
            <label>20 минут</label>
          </div>
        </MainContainerGame>

        <BigResultList progresses={progresses} />
      </div>
    </div>
  );
}
