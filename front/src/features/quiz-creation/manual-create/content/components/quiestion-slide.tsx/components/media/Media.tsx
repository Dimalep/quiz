import styles from "./Media.module.css";

export default function Media() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <button>Выбрать файл</button>
      </div>
    </div>
  );
}
