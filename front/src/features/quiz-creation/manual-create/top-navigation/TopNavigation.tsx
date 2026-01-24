import type { CSSProperties } from "react";

export default function TopNavigation() {
  return <div style={styles.main}>Navigation</div>;
}

const styles = {
  main: {
    background: "lightblue",
    boxShadow: "0px 4px 24px rgba(0,0,0, 0.30)",
    padding: "20px",
  } as CSSProperties,
};
