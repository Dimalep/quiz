import { useEffect, useState } from "react";
import AutoTextarea from "../../../../../../../shared/components/auto-textarea/AutoTextarea";
import { useGeneratorContext } from "../../../../AiGenerateContext";
import styles from "./CurrentQuestionEditor.module.css";

export default function CurrentQuestionEditor() {
  const { state, dispatch } = useGeneratorContext();

  if (!state.currentQuestion) return;

  const [complexity, setComplexity] = useState<Number>();

  useEffect(() => {
    if (!state.currentQuestion) return;
    setComplexity(state.currentQuestion.complexity);
  }, [state.currentQuestion.complexity]);

  return (
    <div className={styles.main}>
      <h3>Редактируемый вопрос</h3>

      <div className={styles.question_text}>
        <label>Вопрос</label>
        <AutoTextarea
          value={state.currentQuestion.text}
          setValue={(value) =>
            dispatch({ type: "SET_CURRENT_QUESTION_TEXT", payload: value })
          }
        />
      </div>

      <div className={styles.complexity_block}>
        <label>Сложность</label>
        <div className={styles.complexity}>
          <button
            className={`${styles.complexity_btn} ${complexity === 1 ? styles.selected_easy : ""}`}
            onClick={() =>
              dispatch({ type: "SET_QUESTION_COMPLEXITY", payload: 1 })
            }
          >
            Легкая
          </button>
          <button
            className={`${styles.complexity_btn} ${complexity === 2 ? styles.selected_middle : ""}`}
            onClick={() =>
              dispatch({ type: "SET_QUESTION_COMPLEXITY", payload: 2 })
            }
          >
            Средняя
          </button>
          <button
            className={`${styles.complexity_btn} ${complexity === 3 ? styles.selected_hard : ""}`}
            onClick={() =>
              dispatch({ type: "SET_QUESTION_COMPLEXITY", payload: 3 })
            }
          >
            Сложная
          </button>
        </div>
      </div>

      <div className={styles.answers}>
        <label>Ответы:</label>
        {state.currentQuestion.answers.map((el) => (
          <AutoTextarea
            key={el.id}
            value={el.text}
            setValue={(e) =>
              dispatch({
                type: "SET_ANSWER_TEXT",
                payload: { answerId: el.id, answerText: e },
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
