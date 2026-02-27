import { useState } from "react";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";
import InputForm from "./components/InputForm";
import styles from "./Authorization.module.css";

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
    "login",
  );

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
    <div className={styles.page}>
      <NavigationPanel />

      <div className={styles.content}>
        <div className={styles.authForm}>
          <h1 className={styles.title}>{titleLabel}</h1>

          <div className={styles.column}>
            <div>{/* for future */}</div>

            <InputForm authMode={authMode} />

            <div
              className={`${styles.bottomPanel} ${
                authMode === "forgot" || authMode === "registrate"
                  ? styles.bottomPanelCenter
                  : styles.bottomPanelSpaceBetween
              }`}
            >
              {authMode !== "forgot" && (
                <span
                  onClick={handleClickLogOrReg}
                  className={styles.clickable}
                >
                  {logOrRegLabel}
                </span>
              )}

              {(authMode === "login" || authMode === "forgot") && (
                <span
                  onClick={handleClickForgotOrNoFo}
                  className={styles.clickable}
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
