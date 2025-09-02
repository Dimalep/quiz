import { useNavigate } from "react-router-dom";
import useUser from "../../core/hooks/useUser";
import { useEffect, useState } from "react";
import Creating from "./components/Creating";
import Library from "./components/Library";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";
import startVideo from "../../assets/video/startpage.mp4";
import Connect from "./components/connect/Connect";
//styles
import "./styles/base.css";
import "./styles/responsive.css";
import Create from "./components/create/Create";
import Footer from "../../shared/components/footer/Footer";

export default function Home() {
  const { addUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    addUser();
  }, []);

  return (
    <>
      <div className="home__main-container">
        <section className="home__back-video">
          <NavigationPanel className="create-page">
            <div onClick={() => navigate("/login")}>Войти</div>
            <button
              className="btn registration"
              onClick={() => navigate("/reg")}
            >
              Зарегистрироваться
            </button>
          </NavigationPanel>
          <video autoPlay muted loop playsInline>
            <source src={startVideo} type="video/mp4" />
          </video>
          <Connect />
        </section>
        <Create />
      </div>
      <div className="footer">footer</div>
    </>
  );
}
