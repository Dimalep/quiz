import { useState, type CSSProperties } from "react";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";
import useWidth from "../../core/hooks/useWindowSize";
import InputForm from "./components/InputForm";

const TITLES = {
  login: "Вход",
  registrate: "Создание аккаунта",
  forgot: "Восстановление пароля",
} as const;

const BUTTONS = {
  logOrReg: {
    login: "Создать аккаунт",
    registrate: "Уже есть аккаунт",
    forgot: "",
  },
  forgot: {
    login: "Восстановить пароль",
    registrate: "",
    forgot: "Отменить восстановление",
  },
} as const;

export default function Authorization() {
  const [authMode, setAuthMode] = useState<"login" | "registrate" | "forgot">(
    "login"
  );

  const { width } = useWidth();

  const titleLabel = TITLES[authMode];
  const logOrRegLabel = BUTTONS.logOrReg[authMode];
  const forgotLabel = BUTTONS.forgot[authMode];

  const handleClickLogOrReg = () => {
    setAuthMode((prev) => (prev === "login" ? "registrate" : "login"));
  };

  const handleClickForgotOrNoFo = () => {
    setAuthMode((prev) => (prev === "forgot" ? "login" : "forgot"));
  };

  return (
    <div style={styles.page}>
      <NavigationPanel />

      <div style={styles.content(width)}>
        <div
          style={{ ...styles.authForm, height: width < 478 ? "100vh" : "auto" }}
        >
          <h1 style={{ margin: 30 }}>{titleLabel}</h1>

          <div style={styles.column}>
            <div>{/*for future*/}</div>
            <InputForm authMode={authMode} />

            <div style={styles.bottomPanel(authMode)}>
              {authMode !== "forgot" && (
                <span onClick={handleClickLogOrReg} style={styles.clickable}>
                  {logOrRegLabel}
                </span>
              )}

              {(authMode === "login" || authMode === "forgot") && (
                <span
                  onClick={handleClickForgotOrNoFo}
                  style={styles.clickable}
                >
                  {forgotLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Rubik",
    color: "#1E1E1E",
  } as CSSProperties,

  content: (width: number) =>
    ({
      flex: width < 478 ? 1 : "0 1 auto",
      display: "flex",
      justifyContent: "center",
      marginTop: width < 478 ? "0" : "200px",
    } as CSSProperties),

  column: {
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,

  clickable: {
    cursor: "pointer",
  } as CSSProperties,

  forgotLable: {
    cursor: "pointer",
  } as CSSProperties,

  bottomPanel: (authMode: string) =>
    ({
      display: "flex",
      justifyContent:
        authMode === "forgot" || authMode === "registrate"
          ? "center"
          : "space-between",
      width: "100%",
      marginTop: "10px",
    } as CSSProperties),

  authForm: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    padding: "30px",
    alignItems: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)",
    background: "rgba(76, 110, 245, 0.7)",
    border: "3px solid black",
  } as CSSProperties,
};
