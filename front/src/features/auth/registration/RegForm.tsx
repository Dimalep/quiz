import { useState } from "react";
import Footer from "../../../shared/components/footer/Footer";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
import { useNavigate } from "react-router-dom";

export default function RegForm() {
  const [inputLogin, setInputLogin] = useState("");
  const [inputPas, setInputPas] = useState("");

  const navigate = useNavigate();

  const handleClickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleClickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="main-container">
      <NavigationPanel className="create-page"></NavigationPanel>
      <div className="content">
        <div className="login-block">
          <h1>регистрации учетной записи</h1>
          <form className="login-form">
            <input
              type="text"
              placeholder="Логин"
              value={inputLogin}
              onChange={(e) => setInputLogin(e.target.value)}
            />
            <input
              type="text"
              placeholder="пароль"
              value={inputPas}
              onChange={(e) => setInputPas(e.target.value)}
            />
            <button onClick={handleClickRegister}>Зарегистрироваться</button>
            <label onClick={handleClickLogin}>Есть учетная запись</label>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
