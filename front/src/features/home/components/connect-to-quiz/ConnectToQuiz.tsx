import { type CSSProperties } from "react";
import Description from "./components/Description";
import ConnectBlock from "./components/connect-block/ConnectBlock";

export default function ConnectToQuiz() {
  return (
    <div style={styles.main}>
      <div style={styles.content}>
        <Description />
        <ConnectBlock />
      </div>
    </div>
  );
}

const styles = {
  main: {
    padding: "20px",
  } as CSSProperties,
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "80%",
    marginLeft: "10%",
    border: "2px solid black",
    borderRadius: 17,
    padding: "10px 30px 10px 30px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
  } as CSSProperties,
};
