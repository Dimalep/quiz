import useUser from "../../core/hooks/user-service-microservice/useUser";
import { useEffect, useRef, type CSSProperties } from "react";
import NavigationPanel from "../../shared/components/navigation-panel/NavigationPanel";
import { useAuthContext } from "../../shared/components/AuthProvider";
import ConnectToQuiz from "./components/connect-to-quiz/ConnectToQuiz";
import CreateQuiz from "./components/create-quiz/CreateQuiz";

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
      <CreateQuiz />
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    gap: 10,
  } as CSSProperties,
};
