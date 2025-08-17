//Styles
import "./styles/base.css";
import "./styles/responsive.css";
import "../../../../shared/styles/buttons_styles.css";

export default function Connecting() {
  return (
    <div className="home__content_connecting">
      <div className="home__content__connecting_text">
        <div className="connecting-content">
          <div className="connecting-icon">🔗</div>
          <h1>
            <b>Подключение к существующему квизу</b>
          </h1>
          <p className="connecting-description">
            Участвуйте в квизе прямо сейчас! Введите код доступа, который вы
            получили от организатора, и присоединяйтесь к увлекательной игре.
          </p>
          <form className="home__content_controls">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Введите код доступа" 
                className="access-code-input"
              />
              <button type="submit" className="btn connect-btn">
                <span className="btn-icon">🎮</span>
                Подключиться
              </button>
            </div>
          </form>
          <div className="feedback"></div>
          <div className="connecting-features">
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Мгновенное подключение</span>
            </div>
            <div className="feature">
              <span className="feature-icon">👥</span>
              <span>Играйте с друзьями</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏆</span>
              <span>Соревнуйтесь за призы</span>
            </div>
          </div>
        </div>
        <div className="home__content__connecting__animation">
          <div className="connection-animation">
            <div className="connection-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
