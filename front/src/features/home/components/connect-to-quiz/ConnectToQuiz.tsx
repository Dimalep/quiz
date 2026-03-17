import Description from "./components/Description";
import ConnectBlock from "./components/connect-block/ConnectBlock";
import styles from "./ConnectToQuiz.module.css";

export default function ConnectToQuiz() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <Description />
        <ConnectBlock />
      </div>
    </div>
  );
}
