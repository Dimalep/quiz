//Styles
import "../styles/connecting_styles.css";
import "../../../shared/styles/buttons_styles.css";

export default function Connecting() {
  return (
    <div className="home__content_connecting">
      <div className="home__content__connecting_text">
        <div>
          <h1>
            <b>Подлкючение к существующему квизу</b>
          </h1>
          <br />
          <b>
            Участвуйте в квизе прямо сейчас! Введите код доступа, который вы
            получили от организатора, и присоединяйтесь.
          </b>
          <br />
          <br />
          <form className="home__content_controls">
            <input placeholder="Код доступа" />
            <button className="btn h-35">Подключится</button>
          </form>
          <div className="feedback"></div>
          <br />
          <span>
            Чтобы присоединиться к квизу:
            <br /> 1. Получите код доступа от организатора.
            <br /> 2. Введите его в поле ниже.
            <br /> 3. Нажмите кнопку "Подключиться".
          </span>
        </div>
        <div className="home__content__connecting__animation"></div>
      </div>
    </div>
  );
}
