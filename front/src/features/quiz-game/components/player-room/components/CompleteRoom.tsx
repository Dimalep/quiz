import { useNavigate } from "react-router-dom";

export default function CompleteRoom() {
  const navigate = useNavigate();

  const handler = () => {
    navigate("/");
    localStorage.removeItem("currentGame");
    localStorage.removeItem("currentProgress");
    localStorage.removeItem("currentQuestionId");
  };

  return (
    <div>
      User completed<button onClick={handler}>Home</button>
    </div>
  );
}
