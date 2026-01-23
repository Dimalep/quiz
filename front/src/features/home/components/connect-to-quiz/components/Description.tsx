import type { CSSProperties } from "react";

export default function Description() {
  return (
    <div style={styles.main}>
      <p style={styles.firestStroke}>Введите код,</p>
      <p>чтобы присоединиться</p>
      <p>к квизу</p>
    </div>
  );
}

const styles = {
  main: {
    margin: 20,
    fontSize: "24px",
    fontFamily: "Rubik",
    fontWeight: 600,
  } as CSSProperties,
  firestStroke: {
    marginLeft: "15px",
  } as CSSProperties,
};
