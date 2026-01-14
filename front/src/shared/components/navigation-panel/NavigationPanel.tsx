import { useNavigate } from "react-router-dom";
import { useState, type CSSProperties } from "react";
import Menu from "./menu/Menu";
import { useAuthContext } from "../AuthProvider";
import { AnimatePresence } from "framer-motion";

interface Props {
  backgroundColor?: string;
}

export default function NavigationPanel({ backgroundColor }: Props) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleClickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/auth");
  };

  const handleClickReg = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/auth");
  };

  return (
    <nav style={{ ...styles.navigationPanel, backgroundColor }}>
      <div style={{ ...styles.logo }} onClick={() => navigate("/")}>
        Quiz
      </div>
      {/* !!!! */}
      {!isAuthenticated ? (
        <div style={styles.actions}>
          <div onClick={handleClickLogin}>Войти</div>
          <div onClick={handleClickReg}>Зарегистрироваться</div>
        </div>
      ) : (
        <>
          <div
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "black",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          ></div>
          <AnimatePresence>
            {isOpenMenu && <Menu setIsOpenMenu={setIsOpenMenu} />}
          </AnimatePresence>
        </>
      )}
    </nav>
  );
}

const styles: {
  navigationPanel: CSSProperties;
  logo: CSSProperties;
  actions: CSSProperties;
} = {
  navigationPanel: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
    padding: "10px",
    zIndex: 10,
    position: "sticky",
    fontFamily: "Rubik",
  },
  logo: {
    fontSize: 48,
    position: "relative",
    justifySelf: "center",
    alignSelf: "center",
    left: 20,
    cursor: "pointer",
    userSelect: "none",
  },
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
  },
};
