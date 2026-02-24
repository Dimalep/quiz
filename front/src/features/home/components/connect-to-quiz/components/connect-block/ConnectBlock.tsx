import { useState, type CSSProperties } from "react";
import ButtonToConnect from "./components/ButtonToConnect";
import InputField from "./components/InputField";
import useQuizSession from "../../../../../../core/hooks/quiz-game-microservice/useQuizSession";
import { useNavigate } from "react-router-dom";
import usePlayer from "../../../../../../core/hooks/quiz-game-microservice/usePlayer";

export default function ConnectBlock() {
  const [inputSessionKey, setInputSessionKey] = useState("");
  const { getQuizSessionBySessionKey } = useQuizSession();
  const { addPlayer } = usePlayer();
  const navigate = useNavigate();

  const connectToQuizHanlder = async () => {
    const data = await getQuizSessionBySessionKey(inputSessionKey);
    if (data === undefined) {
      console.log("Quiz session by session key not exists");
      return;
    }

    const player = await addPlayer("player", data.sessionKey);
    localStorage.setItem("player", JSON.stringify(player));

    // localStorage.setItem(
    //   "player",
    //   JSON.stringify({
    //     id: -1,
    //     nickname: "player1",
    //     role: "player",
    //   }),
    // );
    navigate(`/quiz/game/${inputSessionKey}`);
  };

  return (
    <div style={styles.main}>
      <InputField
        inputSessionKey={inputSessionKey}
        setInputSessionKey={setInputSessionKey}
      />
      <ButtonToConnect connectToQuizHanlder={connectToQuizHanlder} />
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
