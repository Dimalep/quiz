import type { CSSProperties } from "react";
import Content from "./content/Content";

export default function ManualCreate() {
  return (
    <div style={styles.main}>
      <div style={styles.title}>Создать свой квиз с нуля</div>
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
    fontWeight: 600,
  } as CSSProperties,
};
