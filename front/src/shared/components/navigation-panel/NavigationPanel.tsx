import { useNavigate } from "react-router-dom";
//Styles
import "./styles/base.css";
import "./styles/responsive.css";

interface Props {
  className: string;
}

export default function NavigationPanel({ className }: Props) {
  const navigate = useNavigate();

  const handleClickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleClickReg = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/reg");
  };

  return (
    <nav className="navigation-panel">
      <div
        className={`navigation-panel__logo ${className}`}
        onClick={() => navigate("/")}
      >
        Quiz
      </div>
      <div className="navigation-panle__actions">
        <div onClick={handleClickLogin}>Войти</div>
        <div onClick={handleClickReg}>Зарегистрироваться</div>
      </div>
    </nav>
  );
}
