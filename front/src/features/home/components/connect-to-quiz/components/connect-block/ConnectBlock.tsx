import { useState } from "react";
import ButtonToConnect from "./components/ButtonToConnect";
import InputField from "./components/InputField";
import useConnect from "../../useConnect";
import styles from "./ConnectBlock.module.css";

export default function ConnectBlock() {
  const [inputSessionKey, setInputSessionKey] = useState("");
  const { connectToQuiz } = useConnect();

  return (
    <div className={styles.main}>
      <InputField
        inputSessionKey={inputSessionKey}
        setInputSessionKey={setInputSessionKey}
      />
      <ButtonToConnect
        connectToQuizHanlder={async () => await connectToQuiz(inputSessionKey)}
      />
    </div>
  );
}
