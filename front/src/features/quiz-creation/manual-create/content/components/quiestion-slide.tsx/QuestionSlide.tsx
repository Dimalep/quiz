import Answers from "./components/answers/Answers";
import Media from "./components/media/Media";
import QuestionTitle from "./components/question-title/QuestionTitle";
import { useCreateContext } from "../../../create-context/CreateProvider";
import QuestionSettings from "./components/question-settings/QuestionSettings";
import styles from "./QyestionSlide.module.css";

export default function QuestionSlide() {
  const { createNewQuestion } = useCreateContext();

  const nextHandleClick = () => {
    createNewQuestion();
  };

  const applyHandleClick = () => {
    //while empty
  };

  return (
    <div className={styles.main}>
      <QuestionSettings />
      <QuestionTitle />
      <Media />
      <Answers />
      <div className={styles.buttons}>
        <button onClick={applyHandleClick}>Применить</button>
        <button onClick={nextHandleClick}>Следующий</button>
      </div>
    </div>
  );
}
