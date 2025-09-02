import { useState } from "react";
import Footer from "../../../shared/components/footer/Footer";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";

//styles
import "./styles/base.css";
import "./styles/responsive.css";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState("");
  const [inputPas, setInputPas] = useState("");

  const handleClickReg = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/reg");
  };

  return (
    <div className="main-container">
      <NavigationPanel className="create-page"></NavigationPanel>
      <div className="content">
        <div className="login-block">
          <h1>Вход в учетную запись</h1>
          <form className="login-form">
            <input
              type="text"
              placeholder="Логин, почта, номер телефона"
              value={inputLogin}
              onChange={(e) => setInputLogin(e.target.value)}
            />
            <input
              type="text"
              placeholder="пароль"
              value={inputPas}
              onChange={(e) => setInputPas(e.target.value)}
            />
            <button>Войти</button>
            <label onClick={handleClickReg}>Нет учетной записи</label>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
