import { useNavigate } from "react-router-dom";
import { useQuizGamePlayerContext } from "../../../quiz-game-context/QuizGamePlayerContext";
import { useEffect, useState } from "react";
import useProgress, {
  type Progress,
} from "../../../../../core/api/quiz-game-service/useProgress";

export default function CompleteRoom() {
  const navigate = useNavigate();
  const { currentProgress } = useQuizGamePlayerContext();
  const { getProgressById } = useProgress();
  const [results, setResults] = useState<Progress>();

  const handler = () => {
    navigate("/");
    localStorage.removeItem("currentGame");
    localStorage.removeItem("currentProgress");
    localStorage.removeItem("currentQuestionId");
  };

  useEffect(() => {
    async function ll() {
      if (!currentProgress) return;
      const data = await getProgressById(currentProgress.id);
      setResults(data);
    }
    ll();
    console.log("Progress - ", results);
  }, []);

  return (
    <div>
      <div>
        <h1>Квиз завершен</h1>
        <h2>
          Correct answers:
          {results
            ? results.quizResult.quantityCorrectAnswers
            : "result is empty"}
        </h2>
        <button onClick={handler}>Home</button>
      </div>
      <div>
        <h2>Quiz Result:</h2>
        <pre>
          {results
            ? JSON.stringify(results.quizResult, null, 2)
            : "result is empty"}
        </pre>
      </div>
    </div>
  );
}
