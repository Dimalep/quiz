import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
import Footer from "../../../shared/components/footer/Footer";

//styles
import "./styles/base.css";
import "./styles/responsive.css";

export default function AdminRoom() {
  return (
    <div className="admin-room-container">
      <NavigationPanel className="create-page">
        <div className="nav-placeholder">Админ панель</div>
      </NavigationPanel>
      
      <div className="admin-room-content">
        <div className="content-header">
          <h1>Результаты квиза (онлайн)</h1>
          <p>Отслеживайте прогресс игроков в реальном времени</p>
        </div>

        <div className="admin-room-main">
          <div className="leaderboard-section">
            <h2>Таблица лидеров</h2>
            <div className="leaderboard-table">
              <div className="table-header">
                <span className="header-place">Место</span>
                <span className="header-player">Игрок</span>
                <span className="header-score">Очки</span>
              </div>
              <div className="table-body">
                <div className="table-row winner">
                  <span className="place">🥇</span>
                  <span className="player">Иван Иванов</span>
                  <span className="score">120</span>
                </div>
                <div className="table-row">
                  <span className="place">🥈</span>
                  <span className="player">Мария Петрова</span>
                  <span className="score">110</span>
                </div>
                <div className="table-row">
                  <span className="place">🥉</span>
                  <span className="player">Алексей Смирнов</span>
                  <span className="score">95</span>
                </div>
              </div>
            </div>
          </div>

          <div className="live-feed-section">
            <h2>Последние ответы</h2>
            <div className="feed-container">
              <div className="feed-item correct">
                <span className="player-name">Иван</span>
                <span className="action">✅ верно ответил на вопрос 3</span>
                <span className="time">2 мин назад</span>
              </div>
              <div className="feed-item incorrect">
                <span className="player-name">Мария</span>
                <span className="action">❌ ошиблась в вопросе 4</span>
                <span className="time">1 мин назад</span>
              </div>
              <div className="feed-item correct">
                <span className="player-name">Алексей</span>
                <span className="action">✅ верно ответил на вопрос 2</span>
                <span className="time">30 сек назад</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
