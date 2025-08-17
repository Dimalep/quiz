//Styles
import "./footer_styles.css";

export default function Footer() {
  return (
    <div className="footer__container">
      <div className="footer-section">
        <h4>О нас</h4>
        <p>Создавайте и проводите увлекательные квизы для любой аудитории</p>
      </div>
      <div className="footer-section">
        <h4>Возможности</h4>
        <ul>
          <li>Создание квизов</li>
          <li>Онлайн игры</li>
          <li>Библиотека тестов</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Поддержка</h4>
        <ul>
          <li>Помощь</li>
          <li>FAQ</li>
          <li>Контакты</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Социальные сети</h4>
        <div className="social-links">
          <span className="social-icon">📘</span>
          <span className="social-icon">📷</span>
          <span className="social-icon">🐦</span>
        </div>
      </div>
    </div>
  );
}
