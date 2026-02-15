import { useEffect, useState } from "react";
import { useCreateContext } from "../../../../../create-context/CreateProvider";
import styles from "./QuestionTitle.module.css";

export default function QuestionTitle() {
  const { state, dispatch } = useCreateContext();

  const [inputQuestion, setInputQuestion] = useState("");

  useEffect(() => {
    if (state.currentQuestion) {
      setInputQuestion(state.currentQuestion.text);
    } else {
      setInputQuestion("");
    }
  }, [state.currentQuestion]);

  const handleBlur = () => {
    if (!state.currentQuestion) return;

    dispatch({
      type: "UPDATE_QUESTION",
      payload: { text: inputQuestion },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <input
          className={styles.input}
          placeholder="Вопрос"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
