import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div style={styles.logo} onClick={() => navigate("/")}>
      Logo
    </div>
  );
}

const styles = {
  logo: {
    fontSize: 48,
    position: "relative",
    justifySelf: "center",
    alignSelf: "center",
    left: 20,
    cursor: "pointer",
    userSelect: "none",
  } as CSSProperties,
};
