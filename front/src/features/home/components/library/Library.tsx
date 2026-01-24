import type { CSSProperties } from "react";

export default function Library() {
  return (
    <div style={styles.main}>
      <div style={styles.content}>
        <div style={styles.empty}>empty</div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  } as CSSProperties,
  content: {
    display: "flex",
    width: "80%",
    borderTop: "1px solid gray",
    minHeight: "40vh",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,
  empty: {} as CSSProperties,
};
