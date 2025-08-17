import Footer from "../../../shared/components/footer/Footer";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//styles
import "./styles/base.css";
import "./styles/responsive.css";

export default function RegForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Имя пользователя обязательно";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Имя должно содержать минимум 3 символа";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Подтвердите пароль";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log("Registration attempt:", formData);
      // For now, just navigate to home
      navigate("/");
    }
  };

  return (
    <div className="main-container">
      <NavigationPanel className="create-page">
        <div className="nav-placeholder">Регистрация</div>
      </NavigationPanel>
      <div className="content">
        <div className="register-block">
          <div className="register-header">
            <div className="register-icon">🎉</div>
            <h1>Создание аккаунта</h1>
            <p>Присоединяйтесь к QuizMaster и создавайте увлекательные квизы</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Введите имя пользователя"
                value={formData.username}
                onChange={handleInputChange}
                className={errors.username ? "error" : ""}
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>

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
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Создайте пароль"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="register-btn">
              <span className="btn-icon">🚀</span>
              Создать аккаунт
            </button>

            <div className="register-footer">
              <span>Уже есть аккаунт? </span>
              <a href="/login" className="login-link">
                Войти
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
