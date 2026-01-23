import type { CSSProperties } from "react";

export default function Content() {
  return (
    <div style={styles.main}>
      <div>Video</div>
      <div>Description</div>
      <button style={styles.button}>начать генерацию</button>
    </div>
  );
}

const styles = {
  main: { display: "flex", justifyContent: "space-between" } as CSSProperties,
  button: { fontSize: "20px", padding: "10px" } as CSSProperties,
};
