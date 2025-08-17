//Styles
import "../styles/switch_styles.css";

type Props = {
  setContentType: (type: number) => void;
};

export default function SwitchContent({ setContentType }: Props) {
  return (
    <div className="home__switch-content">
      <button className="switch-btn go-to-connecting" onClick={() => setContentType(0)}>
        <span className="btn-icon">🔗</span>
        <span className="btn-text">Подключиться</span>
      </button>
      <button className="switch-btn go-to-creating" onClick={() => setContentType(1)}>
        <span className="btn-icon">✨</span>
        <span className="btn-text">Создать</span>
      </button>
      <button className="switch-btn go-to-library" onClick={() => setContentType(2)}>
        <span className="btn-icon">📚</span>
        <span className="btn-text">Библиотека</span>
      </button>
    </div>
  );
}
