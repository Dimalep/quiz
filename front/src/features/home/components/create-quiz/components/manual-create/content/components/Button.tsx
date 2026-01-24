import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();

  const handleClick = () => {
    //request to backend for creation new quiz and return quiz id
    const fakeQuizId = crypto.randomUUID(); // или Math.random()
    //

    navigate(`quiz/${fakeQuizId}`);
  };

  return (
    <div>
      <button style={styles.button} onClick={handleClick}>
        перейти к созданию
      </button>
    </div>
  );
}

const styles = {
  button: {
    fontSize: "20px",
    padding: "10px",
  } as CSSProperties,
};
