import { useState, type CSSProperties } from "react";
import Switcher from "./components/switcher/Switcher";
import SwipeContainer from "./components/SwipeContainer";
import ManualCreate from "./components/manual-create/ManualCreate";
import AiCreate from "./components/ai-create/AiCreate";

export default function CreateQuiz() {
  const [type, setType] = useState(0);

  return (
    <div style={styles.main}>
      <SwipeContainer setType={setType} type={type}>
        <ManualCreate />
        <AiCreate />
      </SwipeContainer>
      <Switcher setType={setType} type={type} />
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    padding: "20px",
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  } as CSSProperties,
};
