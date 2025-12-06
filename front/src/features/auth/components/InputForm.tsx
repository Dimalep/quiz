import React, { useEffect, useState, type CSSProperties } from "react";
import InputField from "./InputField";
import { useAuthContext } from "../../../shared/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Button from "./Button";

// Here main login authorization
interface Props {
  authMode: string;
}

export default function InputForm({ authMode }: Props) {
  const [inputLogin, setInputLogin] = useState("");
  const [inputPas, setInputPas] = useState("");
  const [inputRepeatPas, setInputRepeatPas] = useState("");
  const [inputContactInfo, setInputContactInfo] = useState("");

  const navigate = useNavigate();
  const { login, authResponse } = useAuthContext();

  const handleClickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(inputLogin, inputPas);
  };

  useEffect(() => {
    if (authResponse.isSuccess) {
      navigate("/");
    }
  }, [authResponse.isSuccess]);

  return (
    <form style={styles.form}>
      <InputField
        key="login-or-mail-or-phone"
        value={inputContactInfo}
        setValue={setInputContactInfo}
        placeholder={
          authMode === "login" || authMode === "forgot"
            ? "Введите логин, почта, номер телефона"
            : "Введите почту, номер телефона"
        }
        type="text"
      />
      <AnimatePresence>
        {authMode === "registrate" && (
          <InputField
            key="login"
            type="text"
            placeholder="Введите логин"
            value={inputLogin}
            setValue={setInputLogin}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(authMode === "registrate" || authMode === "login") && (
          <InputField
            key="password"
            type="password"
            placeholder="Введите пароль"
            value={inputPas}
            setValue={setInputPas}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {authMode === "registrate" && (
          <InputField
            key="repeat-password"
            type="password"
            placeholder="Повторите пароль"
            value={inputRepeatPas}
            setValue={setInputRepeatPas}
          />
        )}
      </AnimatePresence>
      <span>{!authResponse.isSuccess && authResponse.message}</span>
      <Button handleClickLogin={handleClickLogin} authMode={authMode} />
    </form>
  );
}

const styles: { [key: string]: CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "400px",
    transition: "opacity 0.5s easy",
  },
};
