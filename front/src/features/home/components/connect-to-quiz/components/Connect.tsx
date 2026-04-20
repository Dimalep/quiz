import { useState } from "react";
import styles from "./Connect.module.css";
import useConnect from "../useConnect";

export default function Connect() {
  const [sessionKey, setSessionKey] = useState("");

  const { connectToQuiz } = useConnect();

  const toConnectHandler = async () => {
    if (sessionKey.length === 0) {
      alert("Введите код");
      return;
    }
    await connectToQuiz(sessionKey);
  };

  return (
    <div className={styles.main}>
      <div className={styles.input_block}>
        <div className={styles.inside_input}>
          <input
            maxLength={6}
            placeholder="------"
            value={sessionKey}
            onChange={(e) => setSessionKey(e.target.value.replace(/\D/g, ""))}
          />
          <label>{sessionKey.length}/6</label>
          <button onClick={() => setSessionKey("")}>x</button>
        </div>
      </div>
      <button className={styles.connect_btn} onClick={toConnectHandler}>
        Начать
      </button>
    </div>
  );
}
