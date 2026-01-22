import { AnimatePresence } from "framer-motion";
import { useAuthContext } from "../../AuthProvider";
import Menu from "./menu/Menu";
import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export default function LogRegButtons() {
  const { isAuthenticated } = useAuthContext();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
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
    <>
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
    </>
  );
}

const styles = {
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
