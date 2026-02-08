import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Home from "./features/home/Home";
//Styles
import "./shared/styles/app_styles.css";
//import SelectTypeCreation from "./features/quiz-creation/type-selection/SelectTypeCreation";
//import CompleteCreation from "./features/quiz-creation/manual-create/complete-creation/CompleteCreation";

import { AuthProvider } from "./shared/components/AuthProvider";
import ScrollToStart from "./shared/components/scroll-to-start/ScrollToStart";
import ManualCreate from "./features/quiz-creation/manual-create/ManualCreate";
import Authorization from "./features/auth/Authorization";
import WindowSizeProvider from "./shared/components/WindowSizeProvider";
//import QuestionSlide from "./features/quiz-creation/manual-create/content/components/quiestion-slide.tsx/QuestionSlide";

function App() {
  return (
    <BrowserRouter>
      <ScrollToStart />
      <AuthProvider>
        <WindowSizeProvider>
          <Routes>
            <Route path="/auth" element={<Authorization />} />
            <Route path="/" element={<Home />} />
            <Route path="quiz/:quizId" element={<ManualCreate />} />
            <Route
              path="quiz/create/manual/:quizId/:slideId"
              element={<ManualCreate />}
            />
            <Route path="quiz/:quizId/:slideId/" element={<ManualCreate />} />
          </Routes>
        </WindowSizeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
