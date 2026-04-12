import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import "./shared/styles/app_styles.css";

import { AuthProvider } from "./shared/components/AuthProvider";
import ScrollToStart from "./shared/components/scroll-to-start/ScrollToStart";
import ManualCreate from "./features/quiz-creation/manual-create/ManualCreate";
import Authorization from "./features/auth/Authorization";
import CompleteCreation from "./features/quiz-creation/complete-creation/CompleteCreation";
import Profile from "./features/profile/Profile";
import QuizGamePlayer from "./features/quiz-game/QuizGamePlayer";
import QuizGameAdmin from "./features/quiz-game/QuizGameAdmin";
import GameResults from "./features/game-results/GameResults";
import PlayerResult from "./features/player-result/PlayerResult";

function App() {
  return (
    <BrowserRouter>
      <ScrollToStart />
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Authorization />} />
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:quizId" element={<ManualCreate />} />
          <Route
            path="/quiz/:quizId/complete-creation"
            element={<CompleteCreation />}
          />
          <Route
            path="quiz/game/player/:sessionKey"
            element={<QuizGamePlayer />}
          />
          <Route
            path="quiz/game/admin/:sessionKey"
            element={<QuizGameAdmin />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="game-result/:sessionKey" element={<GameResults />} />
          <Route path="player-result/:progressId" element={<PlayerResult />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
