import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../shared/components/AuthProvider";
import AuthButton from "../auth-button/AuthButton";
import styles from "./RegFrom.module.css";

export default function RegForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { authResponse, registrationHandler, clearAuthResponse } =
    useAuthContext();

  useEffect(() => {
    setShowErrorMessage(!authResponse.isSuccess);
  }, [authResponse]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("reg by username");

    await registrationHandler(username, password);
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
      {showErrorMessage && <label>{authResponse.message}</label>}
      <AuthButton>Создать аккаунт</AuthButton>
    </form>
  );
}
