//Styles
import "../styles/switch_styles.css";

type Props = {
  setContentType: (type: number) => void;
};

export default function SwitchContent({ setContentType }: Props) {
  return (
    <div className="home__switch-content">
      <button className="go-to-connecting" onClick={() => setContentType(0)}>
        Подключится
      </button>
      <button className="go-to-library" onClick={() => setContentType(1)}>
        Создать
      </button>
      <button className="go-to-selecting" onClick={() => setContentType(2)}>
        Библиотека
      </button>
    </div>
  );
}
