import { useCreateContext } from "../../../../create-context/CreateProvider";
import styles from "./ButtomButtons.module.css";

interface Props {
  title: string;
  description: string;
}

export default function BottomButtons({ title, description }: Props) {
  const { openSlide, updateQuiz } = useCreateContext();

  const applyHandleClick = () => {
    updateQuiz({ title: title, description: description });
  };

  const nextHandleClick = () => {
    openSlide(1);
  };

  return (
    <div className={styles.main}>
      <button onClick={applyHandleClick}>Применить</button>
      <button onClick={nextHandleClick}>Следующий</button>
    </div>
  );
}
