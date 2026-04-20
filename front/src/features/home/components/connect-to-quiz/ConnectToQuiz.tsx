import Connect from "./components/Connect";
import styles from "./ConnectToQuiz.module.css";

export default function ConnectToQuiz() {
  return (
    <div className={styles.main}>
      <h2>Присоединиться к квизу</h2>
      <h4>Введите код и начните игру</h4>
      <Connect />
    </div>
  );
}
