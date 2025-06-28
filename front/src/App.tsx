import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Home from "./pages/home_page/Home";
//Styles
import "./styles/app_styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
