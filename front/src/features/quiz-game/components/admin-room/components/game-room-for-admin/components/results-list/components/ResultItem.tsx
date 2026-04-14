import type { FilteredProgress } from "../ResultsList";
import styles from "./ResultItem.module.css";

interface Props {
  progress: FilteredProgress;
}

export default function ResultItem({ progress }: Props) {
  const convertStatusToString = (value: number) => {
    switch (value) {
      case 0:
        return "в комнате ожидания";
      case 1:
        return "в игре";
      case 2:
        return "заврешил";
    }
  };

  return (
    <div className={styles.main}>
      {/* Player name */}
      <div className={styles.nickname}>
        <span>Имя</span>
        <label>{progress.playerName}</label>
      </div>
      {/* Player result */}
      <div className={styles.progress}>
        <span>Прогресс</span>
        <label>{progress.progress}</label>
      </div>
      {/* Status */}
      <div className={styles.status}>
        <span>Статус</span>
        <label>{convertStatusToString(progress.status)}</label>
      </div>
    </div>
  );
}
