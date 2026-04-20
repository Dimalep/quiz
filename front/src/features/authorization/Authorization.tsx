import { useNavigate } from "react-router-dom";
import styles from "./Authorization.module.css";
import useAuthUI from "./useAuthUI";
import LoginForm from "./components/login-form/LoginForm";
import RegForm from "./components/reg-form/RegForm";
import AuthByEmailFrom from "./components/auth-by-email/AuthByEmailFrom";
import { useAuthContext } from "../../shared/components/AuthProvider";
import { useEffect } from "react";

export default function Authorization() {
  const navigate = useNavigate();
  const { authType, mode, setMode, setAuthType } = useAuthUI();
  const { isAuthenticated } = useAuthContext();

  //#region route protected
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  //#endregion

  const renderForm = () => {
    if (authType === "login")
      return mode === "username" ? <LoginForm /> : <AuthByEmailFrom />;
    else return mode === "username" ? <RegForm /> : <AuthByEmailFrom />;
  };

  const logOrReg =
    authType === "login"
      ? "Нет аккаунта? Зарегистрироваться"
      : "Уже есть аккаунт? Войти";

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <button className={styles.to_main_btn} onClick={() => navigate("/")}>
          На главную
        </button>

        <div className={styles.auth_block}>
          <h3>{authType === "login" ? "Вход" : "Регистрация"}</h3>

          <div className={styles.mode_btns}>
            <button
              className={mode === "username" ? styles.active : ""}
              onClick={() => setMode("username")}
            >
              По логину
            </button>
            <button
              className={mode === "email" ? styles.active : ""}
              onClick={() => setMode("email")}
            >
              По почте
            </button>
          </div>

          {renderForm()}

          <span
            className={styles.switch_auth}
            onClick={() =>
              setAuthType(authType === "login" ? "registration" : "login")
            }
          >
            {logOrReg}
          </span>
        </div>
      </div>
    </div>
  );
}
