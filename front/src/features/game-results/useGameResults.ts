import { useEffect, useState } from "react";
import useProgress, { type ProgressForAdmin } from "../../core/hooks/quiz-game-microservice/useProgress"
import { useParams } from "react-router-dom";

export default function useGameResults() {
  const [progresses, setProgresses] = useState<ProgressForAdmin[]>();

  const { sessionKey } = useParams<{ sessionKey: string }>();
  const { getProgressById, getProgressesBySessionKey } = useProgress();

  useEffect(() => {
      async function load() {
        const progresses = await getProgressesBySessionKey(String(sessionKey));
        setProgresses(progresses);
      }
  
      load();
  }, []);

  return {progresses, getProgressById}
}
