//Styles
import "../styles/library_styles.css";

export default function Library() {
  return (
    <div className="home__content__library">
      <div className="library-content">
        <div className="library-icon">📚</div>
        <h1>Библиотека квизов</h1>
        <p className="library-description">
          Исследуйте коллекцию готовых квизов по различным темам. 
          Находите интересные тесты для обучения, развлечения или командных игр.
        </p>
        
        <div className="library-features">
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Образование</h3>
            <p>Квизы по науке, истории, литературе и другим предметам</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Развлечения</h3>
            <p>Забавные тесты о фильмах, музыке и поп-культуре</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Бизнес</h3>
            <p>Тесты для корпоративного обучения и тимбилдинга</p>
          </div>
        </div>
        
        <div className="library-actions">
          <button className="btn browse-btn">
            <span className="btn-icon">🔍</span>
            Просмотреть квизы
          </button>
          <button className="btn contribute-btn">
            <span className="btn-icon">📝</span>
            Поделиться своим
          </button>
        </div>
      </div>
      
      <div className="library-animation">
        <div className="floating-books">
          <div className="book">📖</div>
          <div className="book">📚</div>
          <div className="book">📓</div>
          <div className="book">📔</div>
        </div>
      </div>
    </div>
  );
}
