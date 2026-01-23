import useUser from "../../core/hooks/user-service-microservice/useUser";
import { useEffect, useRef, type CSSProperties } from "react";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";
//styles
import "./styles/base.css";
import "./styles/responsive.css";
import { useAuthContext } from "../../shared/components/AuthProvider";
import ConnectToQuiz from "./components/connect-to-quiz/ConnectToQuiz";

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
      <ConnectToQuiz />
    </div>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
  } as CSSProperties,
};
