import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
import Footer from "../../../shared/components/footer/Footer";
// styles
import "./styles/base.css";
import "./styles/responsive.css";
import { useNavigate, useParams } from "react-router-dom";
import useQuiz from "../../../core/hooks/useQuiz";
import type { Quiz } from "../../../core/models/Quiz";
import useQuizSession from "../../../core/hooks/useQuizSession";

export default function WaitingRoom() {
  const { getQuizById } = useQuiz();
  const { createQuizSession } = useQuizSession();
  const navigate = useNavigate();

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
    navigate(`/quiz/play/room/${quizId}/admin`);
  };

  return (
    <div className="waiting-room-container">
      <NavigationPanel className="create-page">
        <div className="nav-placeholder">Ожидание игроков</div>
      </NavigationPanel>

      <div className="waiting-room-content">
        <div className="content-header">
          <h1>Ожидание игроков</h1>
          <div className="quiz-info">
            {quiz ? `Квиз: «${quiz.title}»` : "Загрузка квиза..."}
          </div>
        </div>

        <div className="waiting-room-main">
          <div className="qr-section">
            <h3>QR-код для подключения</h3>
            <div className="qr-container">
              {token ? (
                <QRCode value={`http://localhost:5173/join/${token}`} />
              ) : (
                <div className="qr-loading">Генерация QR-кода...</div>
              )}
            </div>
            <p className="qr-instruction">
              Сканируйте QR-код, чтобы подключиться к игре
            </p>
          </div>

          <div className="players-section">
            <h3>Игроки в комнате</h3>
            <div className="players-list">
              {players.map((player, index) => (
                <div key={index} className="player-item">
                  <span className="player-avatar">👤</span>
                  <span className="player-name">{player}</span>
                </div>
              ))}
            </div>
            <p className="players-count">Всего игроков: {players.length}</p>
          </div>
        </div>

        <div className="action-section">
          <button className="start-quiz-btn" onClick={startQuiz}>
            <span className="btn-icon">🚀</span>
            Запустить квиз
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
