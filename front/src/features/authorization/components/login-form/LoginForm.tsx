import { useEffect, useState } from "react";
import AuthButton from "../auth-button/AuthButton";
import styles from "./LoginForm.module.css";
import { useAuthContext } from "../../../../shared/components/AuthProvider";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginHandler, authResponse, clearAuthResponse } = useAuthContext();

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    setShowErrorMessage(!authResponse.isSuccess);
  }, [authResponse]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login by username");

    setLoading(true);
    await loginHandler(username, password);
    setLoading(false);
  };

  return (
    <form className={styles.main} onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onClick={() => {
          setShowErrorMessage(false);
          clearAuthResponse();
        }}
      />
      <input
        type="text"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onClick={() => {
          setShowErrorMessage(false);
          clearAuthResponse();
        }}
      />
      <label className={styles.error_message}>
        {showErrorMessage && authResponse.message}
      </label>
      <AuthButton>Войти</AuthButton>
    </form>
  );
}
