import useUser from "../../core/hooks/user-service-microservice/useUser";
import { useEffect, useRef } from "react";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";
import startVideo from "../../assets/video/startpage.mp4";
import Connect from "./components/connect/Connect";
//styles
import "./styles/base.css";
import "./styles/responsive.css";
import Create from "./components/create/Create";
import { useAuthContext } from "../../shared/components/AuthProvider";

export default function Home() {
  const { generateAnonymousUser } = useUser();
  const { isAuthenticated } = useAuthContext();

  const didRun = useRef(false);

  useEffect(() => {
    if (isAuthenticated === false) {
      if (didRun.current) return;
      didRun.current = true;
      
      generateAnonymousUser();
    }
  }, []);

  return (
    <>
      <div className="home__main-container">
        <section className="home__back-video">
          <NavigationPanel/>
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
