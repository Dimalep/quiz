import { useEffect, useState } from "react";
import { useCreateContext } from "../../../../../create-context/CreateProvider";
import styles from "./QuestionTitle.module.css";
import AutoTextArea from "../../../../../../common/textarea/AutoTextArea";

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
    <>
      <h3 className={styles.title}>Вопрос</h3>
      <div className={styles.main}>
        <AutoTextArea
          value={inputQuestion}
          setValue={setInputQuestion}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
}
