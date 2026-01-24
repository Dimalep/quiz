import type { CSSProperties } from "react";

export default function BottomNavigation() {
  return <div style={styles.main}>BottomNavigation</div>;
}

const styles = {
  main: {
    position: "fixed",
    width: "100%",
    padding: "20px",
    bottom: "0px",
    backgroundColor: "rgb(24, 93, 158)",
  } as CSSProperties,
};
