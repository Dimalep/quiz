import { motion } from "framer-motion";
import ArrowCloseMenu from "./componetns/ArrowCloseMenu";
import UserInfoBlock from "./componetns/UserInfoBlock";
import LogoutBlock from "./componetns/LogoutBlock";
import type { CSSProperties } from "react";
import SettingsButtons from "./componetns/SettingsButtons/SettingsButtons";

interface Props {
  setIsOpenMenu: (value: boolean) => void;
}

export default function Menu({ setIsOpenMenu }: Props) {
  const width = window.innerWidth;

  return (
    <div style={styles.background} onClick={() => setIsOpenMenu(false)}>
      {width > 780 && <div></div>}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        //
        style={styles.menu(width)}
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowCloseMenu setIsOpenMenu={setIsOpenMenu} />
        <UserInfoBlock />
        <SettingsButtons />
        <LogoutBlock />
      </motion.div>
    </div>
  );
}

const styles = {
  menu: (width: number) =>
    ({
      marginTop: width > 550 ? "20px" : "0px",
      marginBottom: width > 550 ? "20px" : "0px",
      marginLeft: "auto",
      width:
        width < 550
          ? "100%"
          : width < 780
            ? "65%"
            : width < 1250
              ? "45%"
              : "25%",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      borderTopLeftRadius: "15px",
      borderBottomLeftRadius: "15px",
      border: "3px solid black",
      boxShadow: "0 2px 20px rgba(0,0,0, 0.9)",
    }) as CSSProperties,
  background: {
    top: 0,
    left: 0,
    position: "fixed",
    height: "100vh",
    width: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
    backdropFilter: "blur(10px)",
    display: "flex",
  } as CSSProperties,
};
