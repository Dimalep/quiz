import type { CSSProperties } from "react";
import SettingsButton from "./compontents/SettingsButton";
import { useNavigate } from "react-router-dom";

export default function SettingsButtons() {
  const navigate = useNavigate();

  const clickProfileHandler = () => {
    navigate("/profile");
  };

  return (
    <div style={styles.main}>
      <label onClick={clickProfileHandler}>Profile</label>
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
