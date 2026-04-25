import { useState } from "react";
import AutoTextarea from "../../../../../shared/components/auto-textarea/AutoTextarea";
import styles from "./Generator.module.css";
import useAiGenerator from "../../../../../core/api/quiz-creation-service/useAiGenerator";

export default function Generator() {
  const [thema, setThema] = useState("");
  const { generateByThema } = useAiGenerator();

  const generateByThemaHandler = async () => {
    const quiz = await generateByThema(thema);
    console.log("Generated quiz: ", quiz);
  };

  return (
    <div className={styles.main}>
      <div className={styles.thema}>
        <h4>Тема</h4>
        <AutoTextarea value={thema} setValue={setThema} />
        <button onClick={generateByThemaHandler}>Применить</button>
      </div>
      <div className={styles.question}>question</div>
    </div>
  );
}
