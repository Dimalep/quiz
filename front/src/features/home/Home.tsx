import useUser from "../../core/hooks/user-service-microservice/useUser";
import { useEffect, useRef, type CSSProperties } from "react";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";
import startVideo from "../../assets/video/startpage.mp4";
import Connect from "./components/connect/Connect";
//styles
import "./styles/base.css";
import "./styles/responsive.css";
import Create from "./components/create/Create";
import { useAuthContext } from "../../shared/components/AuthProvider";
import { style } from "framer-motion/client";

export default function Home() {
  const { generateAnonymousUser } = useUser();
  const { isAuthenticated } = useAuthContext();

  const didRun = useRef(false);

  useEffect(() => {
    if (isAuthenticated === false) {
      if (didRun.current) return;
      didRun.current = true; // off React StrictMode (DEV)

      generateAnonymousUser();
    }
  }, []);

  return (
    <div style={styles.main}>
      <NavigationPanel />
      {/* <div
        style={{
          display: "flex",
          marginLeft: "10%",
          border: "1px solid black",
          width: "80%",
          borderRadius: "17px",
        }}
      >
        <NavigationPanel />
      </div> */}
    </div>
    // <>
    //   <div className="home__main-container">
    //     <section className="home__back-video">
    //       <NavigationPanel />
    //       <video autoPlay muted loop playsInline>
    //         <source src={startVideo} type="video/mp4" />
    //       </video>
    //       <Connect />
    //     </section>
    //     <Create />
    //   </div>
    //   <div className="footer">footer</div>
    // </>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
  } as CSSProperties,
};
