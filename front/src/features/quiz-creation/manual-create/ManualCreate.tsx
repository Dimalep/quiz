import { type CSSProperties } from "react";
import TopNavigation from "./top-navigation/TopNavigation";
import BottomNavigation from "./bottom-navigation/BottomNavigation";
import Content from "./content/Content";
import CreateProvider from "./create-context/CreateProvider";

export default function ManualCreate() {
  return (
    <div style={styles.main}>
      <CreateProvider>
        <TopNavigation />
        <Content />
        <BottomNavigation />
      </CreateProvider>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  } as CSSProperties,
};
