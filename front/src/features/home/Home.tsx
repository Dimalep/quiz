import { useState } from "react";
//Compnonents
import Footer from "../../shared/components/footer/Footer";
import Connecting from "./components/connect/Connecting";
import SwitchContent from "./components/SwitchContent";
import Creating from "./components/Creating";
import Library from "./components/Library";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";

//styles
import "./styles/base.css";
import "./styles/responsive.css";
import "./styles/content_styles.css";
import "../../shared/styles/buttons_styles.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [contentType, setContentType] = useState<number>(1);
  const navigate = useNavigate();

  let currentContent;
  switch (contentType) {
    case 0:
      currentContent = <Connecting />;
      break;
    case 1:
      currentContent = <Creating />;
      break;
    case 2:
      currentContent = <Library />;
      break;
  }

  return (
    <>
      <div className="home__main-container">
        <NavigationPanel className="create-page">
          <div onClick={() => navigate("/login")}>Войти</div>
          <button className="btn registration" onClick={() => navigate("/reg")}>
            Зарегистрироваться
          </button>
        </NavigationPanel>
        <div className="home__content">
          {currentContent}
          <SwitchContent setContentType={setContentType} />
        </div>
      </div>
      <Footer />
    </>
  );
}
