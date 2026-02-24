import ResultsList from "./components/results-list/ResultsList";
import styles from "./GameRoom.module.css";

export default function GameRoom() {
  return (
    <div className={styles.main}>
      <div>
        <button>Завершить квиз</button>
      </div>
      <ResultsList />
    </div>
  );
}
