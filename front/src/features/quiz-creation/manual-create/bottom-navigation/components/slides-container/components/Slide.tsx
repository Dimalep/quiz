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
      dispatch({ type: "SELECT_QUESTION", payload: { index: number } });
    }
  };

  return (
    <div
      className={`${styles.main} ${state.currentQuestion?.index === number ? styles.active : ""}`}
      onClick={handleClick}
    >
      {number}
    </div>
  );
}
