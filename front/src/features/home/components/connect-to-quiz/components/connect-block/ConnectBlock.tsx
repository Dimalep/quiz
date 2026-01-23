import type { CSSProperties } from "react";
import ButtonToConnect from "./components/ButtonToConnect";
import InputField from "./components/InputField";

export default function ConnectBlock() {
  return (
    <div style={styles.main}>
      <InputField />
      <ButtonToConnect />
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    width: "60%",
    gap: "10px",
  } as CSSProperties,
};
