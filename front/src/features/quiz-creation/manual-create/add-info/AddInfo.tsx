import { useNavigate } from "react-router-dom";
import NavigationPanel from "../../../../shared/components/navigation-panel/NavigationPanel";
import "./styles/base.css";
import "./styles/responsive.css";
import Footer from "../../../../shared/components/footer/Footer";
import { useState } from "react";
import useQuiz from "../../../../core/hooks/useQuiz";

export default function AddInfo() {
  const [inputTitleQuiz, setInputTitleQuiz] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputTime, setInputTime] = useState("15:00");
  const [chackFields, setChackFields] = useState(true);

  const navigate = useNavigate();

  const { addQuiz } = useQuiz();

  const handleClickContinue = () => {
    if (inputDescription !== "") {
      if (inputTitleQuiz !== "") {
        setChackFields(true);

        const [min, sec] = inputTime.split(":").map(Number);
        const secs = min * 60 + sec;

        addQuiz({
          title: inputTitleQuiz,
          description: inputDescription,
          time: secs.toString(),
        });

        navigate("/quiz/create/manual/add");
      }
    }
    setChackFields(false);
  };

  return (
    <div className="starting-create__main-container">
      <NavigationPanel className="create-page">
        <div>123</div>
      </NavigationPanel>
      <div className="starting-create__content">
        <label className="pb-2 text-2xl">Создание нового квиза</label>
        {/*Quiz title*/}
        <label htmlFor="quiz-title">Название квиза</label>
        <input
          id="quiz-title"
          placeholder="Введите название"
          className="input border rounded-sm pl-2 h-10"
          onChange={(e) => setInputTitleQuiz(e.target.value)}
          value={inputTitleQuiz}
        />
        {/*Quiz description*/}
        <label htmlFor="quiz-decription" className="pt-4">
          Описание квиза
        </label>
        <textarea
          id="quiz-decription"
          placeholder="Введите описание для квиза"
          className="textarea border rounded-sm pl-2 pt-2 h-32 resize-none"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <label>Время на прохождение квиза</label>
        <input
          type="time"
          step="60"
          className="input border rounded-sm pl-2 h-10"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <div>
          {chackFields === false && (
            <label style={{ color: "red" }}>Не все поля заполнены!</label>
          )}
        </div>
        <button
          className="starting-create__btn__continue"
          onClick={() => handleClickContinue()}
        >
          Продолжить
        </button>
      </div>
      <Footer />
    </div>
  );
}
