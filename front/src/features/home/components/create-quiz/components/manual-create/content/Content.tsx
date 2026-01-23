import type { CSSProperties } from "react";
import Button from "./components/Button";
import Description from "./components/Description";
import VideoBlock from "./components/VideoBlock";

export default function Content() {
  return (
    <div style={styles.main}>
      <VideoBlock />
      <Description />
      <Button />
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flex: "column",
    justifyContent: "space-between",
  } as CSSProperties,
};
