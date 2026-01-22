import type { CSSProperties } from "react";
import SettingsButton from "./compontents/SettingsButton";

export default function SettingsButtons() {
  return (
    <div style={styles.main}>
      <SettingsButton title="settings" />
      <SettingsButton title="info" />
      <SettingsButton title="any" />
    </div>
  );
}

const styles = {
  main: {
    height: "60%",
    display: "flex",
    flexDirection: "column",
    fontSize: "30px",
    alignItems: "center",
    gap: "15px",
    margin: "5%",
  } as CSSProperties,
};
