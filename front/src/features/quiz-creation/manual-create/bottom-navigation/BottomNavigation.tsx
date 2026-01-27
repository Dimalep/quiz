import type { CSSProperties } from "react";
import SlideContainer from "./components/slides-container/SlideContainer";

export default function BottomNavigation() {
  return (
    <div style={styles.main}>
      <SlideContainer />
    </div>
  );
}

const styles = {
  main: {
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: "20px",
    bottom: "0px",
    backgroundColor: "rgb(24, 93, 158)",
    boxShadow: "0px -4px 24px rgba(0,0,0, 0.30)",
  } as CSSProperties,
};
