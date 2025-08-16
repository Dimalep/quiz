import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
// styles
import "./styles/base.css";
import "./styles/responsive.css";
import { useParams } from "react-router-dom";
import useQuiz from "../../../core/hooks/useQuiz";
import type { Quiz } from "../../../core/models/Quiz";
import useQuizSession from "../../../core/hooks/useQuizSession";

export default function WaitingRoom() {
  const { getQuizById } = useQuiz();
  const { createQuizSession } = useQuizSession();

  const [players, setPlayers] = useState(["Игрок 1", "Игрок 2"]);
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      const data = await getQuizById(Number(quizId));
      if (data) setQuiz(data);
    }
    async function initSession() {
      const session = await createQuizSession(Number(quizId), null); // null для анонимного
      if (session?.token) setToken(session.token);
    }

    initSession();
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (token) console.log("token from state:", token);
  }, [token]);

  const startQuiz = () => {
    alert("Квиз запущен!");
  };

  return (
    <div className="waiting-room__main-container">
      <NavigationPanel className="create-page">
        <div>Waiting Room</div>
      </NavigationPanel>

      <div className="waiting-room__content">
        <div className="waiting-room__title-block">
          {quiz ? `Квиз: «${quiz.title}»` : "Загрузка квиза..."}
        </div>

        <div className="waiting-room__info-block">
          <div className="waiting-room__code">
            {token ? (
              <QRCode value={`http://localhost:5173/join/${token}`} />
            ) : (
              <p>Генерация QR-кода...</p>
            )}
            <div className="waiting-room__code-text">
              Сканируйте QR-код, чтобы подключиться
            </div>
          </div>

          <div className="waiting-room__users-list">
            <h3>Игроки в комнате</h3>
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>

        <button onClick={startQuiz}>Запустить квиз</button>
      </div>
    </div>
  );
}
