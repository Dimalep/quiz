import AiGenerateContext from "./AiGenerateContext";
import styles from "./AiGenerator.module.css";
import Generator from "./components/generator/Generator";

export default function AiGenerator() {
  return (
    <AiGenerateContext>
      <div className={styles.main}>
        <div className={styles.content}>content</div>
        <div className={styles.generator}>
          <Generator />
        </div>
      </div>
    </AiGenerateContext>
  );
}
