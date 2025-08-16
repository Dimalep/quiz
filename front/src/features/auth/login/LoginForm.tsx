import Footer from "../../../shared/components/footer/Footer";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";

//styles
import "./styles/base.css";
import "./styles/responsive.css";

export default function LoginForm() {
  return (
    <div className="main-container">
      <NavigationPanel className="create-page">
        <div>123</div>
      </NavigationPanel>
      <div className="content">
        <div className="login-block">
          <h1>Вход в учетную запись</h1>
          <form className="login-form">
            <input type="text" placeholder="Логин, почта, номер телефона" />
            <input type="text" placeholder="пароль" />
            <button>Войти</button>
            <label>Нет учетной записи</label>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
