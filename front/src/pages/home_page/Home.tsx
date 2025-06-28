import { useState } from "react";

//Compnonents
import Footer from "../../components/Footer";
import Connecting from "./components/Connecting";
import NavigationPanel from "./components/NavigationPanel";

//styles
import "./styles/home_styles.css";
import "./styles/content_styles.css";
import SwitchContent from "./components/SwitchContent";
import Creating from "./components/Creating";
import AnimatedContainer from "./components/AnimatedContainer";

export default function Home() {
  const [contentType, setContentType] = useState<number>(0);
  const [prevType, setPrevType] = useState<number>(0);

  let content;
  const direction: "left" | "right" = contentType > prevType ? "right" : "left";

  switch (contentType) {
    case 0:
      content = <Connecting />;
      break;
    case 1:
      content = <Creating />;
      break;
    case 2:
      content = <Connecting />;
      break;
    default:
      content = <Connecting />;
  }

  //handles
  const handleSetContentType = (type: number) => {
    setPrevType(contentType);
    setContentType(type);
  };

  return (
    <div className="home__main-container">
      <NavigationPanel />
      <div className="home__content">
        <div className="home__content__animated-container">
          <AnimatedContainer
            key={contentType}
            direction={direction}
            inProp={true}
          >
            {content}
          </AnimatedContainer>
        </div>
        <SwitchContent setContentType={handleSetContentType} />
      </div>
      <Footer />
    </div>
  );
}
