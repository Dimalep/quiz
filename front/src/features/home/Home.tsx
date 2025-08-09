import { useState } from "react";
//Compnonents
import Footer from "../../shared/components/footer/Footer";
import Connecting from "./components/Connecting";
import SwitchContent from "./components/SwitchContent";
import Creating from "./components/Creating";
import Library from "./components/Library";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";

//styles
import "./styles/home_styles.css";
import "./styles/content_styles.css";
import "../../shared/styles/buttons_styles.css";

export default function Home() {
  const [contentType, setContentType] = useState<number>(1);

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
        <NavigationPanel className="home-page">
          <div>Войти</div>
          <button className="btn registration">Зарегистрироваться</button>
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
