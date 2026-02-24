// import { useQuizGameContext } from "../../../quiz-game-context/QuizGameContext";
import QuizQrCode from "./components/QuizQrCode";
import styles from "./InfoForConnect.module.css";

export default function InfoForConnect() {
  // const { sessionKey } = useQuizGameContext();

  return (
    <div className={styles.main}>
      <div>
        <QuizQrCode />
      </div>
      <div>{/* <h2>{sessionKey}</h2> */}</div>
    </div>
  );
}
