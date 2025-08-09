//Styles
import { useNavigate } from "react-router-dom";
import "../styles/creating_styles.css";
import "../../../shared/styles/buttons_styles.css";

export default function Creating() {
  const navigate = useNavigate();

  return (
    <div className="home__content__creating">
      <div className="home__content__creating__text">
        <h1>
          <b>Создание нового квиза</b>
        </h1>
        <br />
        <b>Нажми на кнопку чтобы создать собственный квиз без регистрации </b>
      </div>
      <br />
      <button
        className="btn"
        onClick={() => {
          navigate("/quiz/create");
        }}
      >
        Создать
      </button>
      <div className="home__content__creating__animation"></div>
    </div>
  );
}
