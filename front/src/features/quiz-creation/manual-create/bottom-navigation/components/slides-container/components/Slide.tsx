import { useCreateContext } from "../../../../create-context/CreateProvider";
import styles from "./Slide.module.css";

interface Props {
  number: number;
}

export default function Slide({ number }: Props) {
  const { state, dispatch } = useCreateContext();

  const isSelected =
    (state.currentQuestion === undefined && number === 0) ||
    state.currentQuestion?.index === number;

  const handleClick = () => {
    if (number === 0) {
      dispatch({ type: "OPEN_SETTINGS" });
    } else {
      dispatch({ type: "SELECT_QUESTION", payload: { index: number } });
    }
  };

  return (
    <div
      className={`${styles.main} ${isSelected ? styles.active : ""}`}
      onClick={handleClick}
    >
      {number}
    </div>
  );
}
