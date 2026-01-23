import type { CSSProperties } from "react";

export default function Button() {
  return (
    <div>
      <button style={styles.button}>перейти к созданию</button>
    </div>
  );
}

const styles = {
  button: {
    fontSize: "20px",
    padding: "10px",
  } as CSSProperties,
};
