import Footer from "../../../shared/components/footer/Footer";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//styles
import "./styles/base.css";
import "./styles/responsive.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    
    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
      console.log("Login attempt:", formData);
      // For now, just navigate to home
      navigate("/");
    }
  };

  return (
    <div className="main-container">
      <NavigationPanel className="create-page">
        <div className="nav-placeholder">Войти в систему</div>
      </NavigationPanel>
      <div className="content">
        <div className="login-block">
          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h1>Вход в учетную запись</h1>
            <p>Добро пожаловать обратно! Войдите в свой аккаунт</p>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Введите ваш email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Введите ваш пароль"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Запомнить меня</span>
              </label>
              <a href="#" className="forgot-password">Забыли пароль?</a>
            </div>
            
            <button type="submit" className="login-btn">
              <span className="btn-icon">🚀</span>
              Войти
            </button>
            
            <div className="login-footer">
              <span>Нет учетной записи? </span>
              <a href="/reg" className="register-link">Зарегистрироваться</a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
