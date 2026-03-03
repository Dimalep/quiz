import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import "./shared/styles/app_styles.css";

import { AuthProvider } from "./shared/components/AuthProvider";
import ScrollToStart from "./shared/components/scroll-to-start/ScrollToStart";
import ManualCreate from "./features/quiz-creation/manual-create/ManualCreate";
import Authorization from "./features/auth/Authorization";
import CompleteCreation from "./features/quiz-creation/complete-creation/CompleteCreation";
import QuizGame from "./features/quiz-game/QuizGame";

function App() {
  return (
    <BrowserRouter>
      <ScrollToStart />
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Authorization />} />
          <Route path="/" element={<Home />} />
          <Route path="quiz/:quizId" element={<ManualCreate />} />
          <Route
            path="/quiz/:quizId/complete-creation"
            element={<CompleteCreation />}
          />
          <Route path="quiz/game/:sessionKey" element={<QuizGame />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
