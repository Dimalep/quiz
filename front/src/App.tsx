import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Home from "./features/home/Home";
//Styles
import "./shared/styles/app_styles.css";
//import SelectTypeCreation from "./features/quiz-creation/type-selection/SelectTypeCreation";
import CompleteCreation from "./features/quiz-creation/manual-create/complete-creation/CompleteCreation";
import WaitingRoom from "./features/play-sessions/waiting-room/WaitingRoom";
import WaitingRoomPlayers from "./features/play-sessions/waiting-room-players/WaitingRoomPlayers";
import { AuthProvider } from "./shared/components/AuthProvider";
import ScrollToStart from "./shared/components/scroll-to-start/ScrollToStart";
import ManualCreate from "./features/quiz-creation/manual-create/ManualCreate";
import Authorization from "./features/auth/Authorization";

function App() {
  return (
    <BrowserRouter>
      <ScrollToStart />
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Authorization />} />
          <Route path="/" element={<Home />} />
          <Route path="quiz/create/manual" element={<ManualCreate />} />
          <Route
            path="quiz/create/manual/:quizId/:slideId"
            element={<ManualCreate />}
          />
          <Route
            path="/quiz/create/manual/complete"
            element={<CompleteCreation />}
          />
          <Route
            path="/quiz/play/room/:quizId/admin"
            element={<WaitingRoom />}
          />
          <Route
            path="/quiz/play/room/:quizId/player"
            element={<WaitingRoomPlayers />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
