import "../styles/navigation_styles.css";

export default function NavigationPanel() {
  return (
    <nav className="home__navigation-panel">
      <div className="home__navigation-panel__title">Quiz</div>
      <div className="home__navigation-panel__login">
        <label>Войти</label>
        <button>Зарегистрироваться</button>
      </div>
    </nav>
  );
}
