import { useAuthContext } from "../../shared/components/AuthProvider";
import BigResultList from "./components/BigResultList";
import styles from "./GameResults.module.css";
import useGameResults from "./useGameResults";

export default function GameResults() {
  const { progresses, goToMain } = useGameResults();

  return (
    <div className={styles.main}>
      <button className={styles.gotomain} onClick={goToMain}>
        На главную
      </button>

      <div className={styles.avg_info}>
        <div>
          <span>Количество игроков: </span>
          <label>{progresses?.length}</label>
        </div>
      </div>

      <BigResultList progresses={progresses} />
    </div>
  );
}
