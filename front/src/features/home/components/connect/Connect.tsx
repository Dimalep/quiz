import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizSession from "../../../../core/hooks/useQuizSession";
import useSessionStorage from "../../../../core/hooks/useSessionStorage";

import "./styles/base.css";
import "./styles/responsive.css";

export default function Connect() {
  const navigate = useNavigate();
  const [connectCode, setConnectCode] = useState("");
  const { connect, getQuizByToken } = useQuizSession();
  const { getItemFromSS } = useSessionStorage();

  const handleClickConnect = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = getItemFromSS("anonUserId");
    if (id !== null) {
      connect(connectCode, Number(id));
      navigate(`/quiz/play/room/${getQuizByToken(connectCode)}/player`); //*
    }
  };
  return (
    <div className="home__connect">
      <h1>Добро пожаловать!</h1>
      <p>Начни свой онлайн-квиз прямо сейчас</p>
      <form>
        <input type="text"></input>
        <button onClick={handleClickConnect}>Подключиться</button>
      </form>
    </div>
  );
}
