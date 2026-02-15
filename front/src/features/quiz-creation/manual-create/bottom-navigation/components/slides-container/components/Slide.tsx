import { useCreateContext } from "../../../../create-context/CreateProvider";
import styles from "./Slide.module.css";

interface Props {
  number: number;
}

export default function Slide({ number }: Props) {
  const { state, dispatch } = useCreateContext();

  const handleClick = () => {
    if (number === 0) {
      dispatch({ type: "OPEN_SETTINGS" });
    } else {
      dispatch({ type: "SELECT_QUESTION", payload: { number: number } });
    }
  };

  return (
    <div
      className={`${styles.main} ${state.currentQuestion?.number === number ? styles.active : ""}`}
      onClick={handleClick}
    >
      {number}
    </div>
  );
}
