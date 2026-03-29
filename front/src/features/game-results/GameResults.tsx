import BigResultList from "./components/BigResultList";
import styles from "./GameResults.module.css";
import useGameResults from "./useGameResults";

export default function GameResults() {
  const { progresses, getProgressById } = useGameResults();

  return (
    <div className={styles.main}>
      <button>Запустить снова</button>
      <BigResultList progresses={progresses} getProgressById={getProgressById}/>
    </div>
  );
}
