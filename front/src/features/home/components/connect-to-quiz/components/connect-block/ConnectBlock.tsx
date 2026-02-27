import { useState, type CSSProperties } from "react";
import ButtonToConnect from "./components/ButtonToConnect";
import InputField from "./components/InputField";
import useConnect from "../../useConnect";

export default function ConnectBlock() {
  const [inputSessionKey, setInputSessionKey] = useState("");
  const { connectToQuiz } = useConnect();

  return (
    <div style={styles.main}>
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

const styles = {
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    width: "60%",
    gap: "10px",
  } as CSSProperties,
};
