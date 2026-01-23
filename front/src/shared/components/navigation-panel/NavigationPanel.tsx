import { type CSSProperties } from "react";

import AuthBlock from "./components/AuthBlock";
import Logo from "./components/Logo";

export default function NavigationPanel() {
  return (
    <div style={styles.main}>
      <nav style={styles.navigationPanel}>
        <Logo />
        <AuthBlock />
      </nav>
    </div>
  );
}

const styles = {
  main: {
    padding: 20,
  } as CSSProperties,
  navigationPanel: {
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.35)",
    padding: "10px",
    zIndex: 10,
    position: "sticky",
    fontFamily: "Rubik",
    margin: "0 auto",
    border: "2px solid black",
    borderRadius: "17px",
  } as CSSProperties,
  actions: {
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    position: "relative",
    right: 20,
    justifySelf: "center",
    alignSelf: "center",
    gap: 10,
    cursor: "pointer",
  } as CSSProperties,
};
