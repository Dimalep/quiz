import styles from "./ComplexityBlock.module.css";
import { useCreateContext } from "../../../../../create-context/CreateProvider";

export default function ComplexityBlock() {
  const { dispatch, state } = useCreateContext();

  const current = state.currentQuestion;

  if (!current) return null;

  const selected = current.complexity;

  const getClass = () => {
    switch (selected) {
      case 1:
        return styles.easy;
      case 2:
        return styles.medium;
      case 3:
        return styles.hard;
      default:
        return "";
    }
  };

  return (
    <div>
      <h3 className={styles.title}>Сложность вопроса</h3>

      <div className={styles.complexity_wrapper}>
        <select
          className={`${styles.complexity_choose} ${getClass()}`}
          value={selected}
          onChange={(e) => {
            const value = Number(e.target.value);

            dispatch({
              type: "CHANGE_QUESTION_COMPLEXITY",
              payload: { complexity: value },
            });
          }}
        >
          <option value={1}>Легкий</option>
          <option value={2}>Средний</option>
          <option value={3}>Сложный</option>
        </select>
      </div>
    </div>
  );
}
