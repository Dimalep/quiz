import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Home from "./pages/home_page/Home";
//Styles
import "./styles/app_styles.css";
import SelectTypeCreation from "./pages/type_quiz_creation_page/SelectTypeCreation";
import CreateQuizManually from "./pages/create_quiz_manually_page/CreateQuizManually";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create_quiz" element={<SelectTypeCreation />} />
        <Route path="/create_quiz/manually" element={<CreateQuizManually />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
