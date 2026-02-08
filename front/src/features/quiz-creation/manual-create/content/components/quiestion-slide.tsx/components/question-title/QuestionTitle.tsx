import { useEffect, useState } from "react";
import { useCreateContext } from "../../../../../create-context/CreateProvider";
import styles from "./QuestionTitle.module.css";

export default function QuestionTitle() {
  const { updateQuestionTitle, currentSlide } = useCreateContext();

  const [inputQuestion, setInputQuestion] = useState("");

  useEffect(() => {
    if (currentSlide && currentSlide.question) {
      setInputQuestion(currentSlide.question.title);
    }
  }, [currentSlide]);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <input
          className={styles.input}
          placeholder="Вопрос"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onBlur={() => updateQuestionTitle(inputQuestion)}
        />
      </div>
    </div>
  );
}
