import type { CSSProperties } from "react";
import Content from "./components/Content";

export default function AiCreate() {
  return (
    <div style={styles.main}>
      <div style={styles.title}>Сгенерировать квиз </div>
      <Content />
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  } as CSSProperties,
  title: {
    fontSize: "24px",
    fontFamily: "Rubik",
    fontWeight: "600px",
  } as CSSProperties,
};
