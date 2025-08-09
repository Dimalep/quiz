import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Home from "./features/home/Home";
//Styles
import "./shared/styles/app_styles.css";
import SelectTypeCreation from "./features/quiz-creation/type-selection/SelectTypeCreation";
import AddQuesions from "./features/quiz-creation/manual-create/add-questions/AddQuesions";
import AddInfo from "./features/quiz-creation/manual-create/add-info/AddInfo";
import CompleteCreation from "./features/quiz-creation/manual-create/complete-creation/CompleteCreation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/create" element={<SelectTypeCreation />} />
        <Route path="/quiz/create/manual/add" element={<AddQuesions />} />
        <Route path="/quiz/create/manual/info" element={<AddInfo />} />
        <Route
          path="/quiz/create/manual/complete"
          element={<CompleteCreation />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
