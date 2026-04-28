import AutoTextarea from "../../../../../shared/components/auto-textarea/AutoTextarea";
import styles from "./Generator.module.css";
import { useGeneratorContext } from "../../AiGenerateContext";
import CurrentQuestionEditor from "./components/current-question-editor/CurrentQuestionEditor";
import AddQuestions from "./components/add-questions/AddQuestions";
import { useState } from "react";

export default function Generator() {
  const { state, dispatch, generateByThemaHandler } = useGeneratorContext();

  const [title, setTitle] = useState(state.quiz.title);
  const [description, setDescription] = useState(state.quiz.description);

  return (
    <div className={styles.main}>
      <div className={styles.thema}>
        <h3>Тема</h3>
        <AutoTextarea
          value={state.thema}
          setValue={(value) => dispatch({ type: "SET_THEMA", payload: value })}
        />
        <button onClick={generateByThemaHandler}>Применить</button>
      </div>
      {state.currentQuestion ? (
        <CurrentQuestionEditor />
      ) : (
        <div className={styles.info}>
          <h3>Редактирование описания</h3>
          <AutoTextarea
            value={title}
            setValue={setTitle}
            onBlur={() => {
              dispatch({ type: "SET_QUIZ_TITLE", payload: title });
            }}
          />
          <AutoTextarea
            value={description}
            setValue={setDescription}
            onBlur={() => {
              dispatch({ type: "SET_QUIZ_DESCRIPTION", payload: description });
            }}
          />
        </div>
      )}

      <AddQuestions />
    </div>
  );
}
