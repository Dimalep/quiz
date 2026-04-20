import { useState } from "react";
import styles from "./AuthByEmailFrom.module.css";
import { useAuthContext } from "../../../../shared/components/AuthProvider";
import AuthButton from "../auth-button/AuthButton";

export default function AuthByEmailFrom() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const {
    setIsAuthenticated,
    sendCodeToEmail,
    sendConfirmCode,
    clearAuthResponse,
  } = useAuthContext();

  const sendCodeToEmailHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    console.log("auth by email");

    //#region *
    const rowAnonUserId = localStorage.getItem("userId");
    if (!rowAnonUserId) {
      console.log("Cannot get user fron local storage");
      return;
    }
    const anonUserId = JSON.parse(rowAnonUserId);
    //#endregion

    setLoading(true);

    await sendCodeToEmail(email, anonUserId);

    setLoading(false);

    setIsConfirmEmail(true);
  };

  const sendConfirmCodeHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    //#region *
    const rowAnonUserId = localStorage.getItem("userId");
    if (!rowAnonUserId) {
      console.log("Cannot get user fron local storage");
      return;
    }
    const anonUserId = JSON.parse(rowAnonUserId);
    //#endregion

    const res = await sendConfirmCode(confirmCode, email, anonUserId);
    if (!res) {
      console.log("Error confirm email");
      return;
    }

    setIsAuthenticated(true);

    console.log("Success confirm email ", res);
  };

  if (loading)
    return (
      <div>
        <h4>Отправка кода подтверждения...</h4>
      </div>
    );

  if (isConfirmEmail)
    return (
      <form className={styles.confirmation} onSubmit={sendConfirmCodeHandler}>
        <input
          type="text"
          placeholder="Код подтверждения"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
        />
        <AuthButton>Подтвердить код</AuthButton>
      </form>
    );
  else
    return (
      <form className={styles.main} onSubmit={sendCodeToEmailHandler}>
        <input
          type="text"
          placeholder="Эл. почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthButton>Получить код</AuthButton>
      </form>
    );
}
