import type { CSSProperties } from "react";

export default function Media() {
  return (
    <div style={styles.main}>
      <div style={styles.content}>{"media (while not working)"}</div>
    </div>
  );
}

const styles = {
  main: { padding: "10px 20px" } as CSSProperties,
  content: {
    display: "flex",
    justifyContent: "center",
    border: "2px solid black",
    //width: "500px",
    borderRadius: "13px",
  } as CSSProperties,
};
