import ResultItem from "./components/ResultItem";
import styles from "./ResultsList.module.css";

export default function ResultsList() {
  return (
    <div className={styles.main}>
      <ResultItem />
    </div>
  );
}
