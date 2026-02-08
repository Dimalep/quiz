import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export default function TopNavigation() {
  const navigate = useNavigate();
  return (
    <div style={styles.main}>
      <div style={styles.title} onClick={() => navigate("/")}>
        logo
      </div>
      <div>1</div>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    background: "lightblue",
    boxShadow: "0px 4px 24px rgba(0,0,0, 0.30)",
    padding: "20px",
  } as CSSProperties,
  title: {
    fontSize: "24px",
    fontFamily: "Rubik",
    fontWeight: "600px",
    cursor: "pointer",
  } as CSSProperties,
};
