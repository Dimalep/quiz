import { useEffect, useState } from "react";
import useProgress, { type ProgressForAdmin } from "../../core/hooks/quiz-game-microservice/useProgress"
import { useNavigate, useParams } from "react-router-dom";

export default function useGameResults() {
  const [progresses, setProgresses] = useState<ProgressForAdmin[]>();

  const { sessionKey } = useParams<{ sessionKey: string }>();
  const { getProgressById, getProgressesBySessionKey } = useProgress();
  const navigate = useNavigate();

  useEffect(() => {
      async function load() {
        const progresses = await getProgressesBySessionKey(String(sessionKey));
        setProgresses(progresses);
      }
  
      load();
  }, []);

  const goToMain = () => {

    localStorage.removeItem("currentProgress");
    localStorage.removeItem("currentGame");
    localStorage.removeItem("currentQuestionIndex");

    navigate("/");
  }

  return {progresses, getProgressById, goToMain}
}
