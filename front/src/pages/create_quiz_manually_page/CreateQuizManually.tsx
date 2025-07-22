//Components
import NavigationPanel from "../../components/NavigationPanel";
import QuestionBlock from "./components/QuestionBlock";
//Styles
import "./styles/base.css";
import "./styles/responsive.css";
//Hooks
import useQuestoins from "./hooks/useQuestoins";

export default function CreateQuizManually() {
  const { addQuestion, deleteQuestion, questions } = useQuestoins([
    { id: 1, numQ: 1 },
  ]);

  return (
    <div>
      <NavigationPanel className="create-page">
        <div>123123</div>
      </NavigationPanel>
      <div className="create-quiz-page__main-container">
        <div className="create-quiz-page__content-container">
          <label className="pb-2 text-2xl">Создание нового квиза</label>
          {/*Quiz title*/}
          <label htmlFor="quiz-title">Название квиза</label>
          <input
            id="quiz-title"
            placeholder="Введите название"
            className="input border rounded-sm pl-2 h-10"
          />
          {/*Quiz description*/}
          <label htmlFor="quiz-decription" className="pt-4">
            Описание квиза
          </label>
          <textarea
            id="quiz-decription"
            placeholder="Введите описание для квиза"
            className="textarea border rounded-sm pl-2 pt-2 h-32 resize-none"
          />
          {/*Quiz cagetory*/}
          <label className="pt-4">Категория</label>
          <select className="border rounded-sm h-8">
            <option value={"тип 1"}>type 1</option>
            <option value={"тип 2"} selected>
              type 2
            </option>
            <option value={"тип 3"}>type 3</option>
          </select>

          <div className="container-with-questions">
            {questions.map((el) => (
              <QuestionBlock
                key={el.id}
                questionId={el.id}
                numberQuestion={el.numQ}
                onDelete={deleteQuestion}
              />
            ))}
          </div>

          <button
            className="btn__add-question h-10 bg-blue-500 rounded text-white w-full"
            onClick={addQuestion}
          >
            Add questions
          </button>
        </div>
      </div>
    </div>
  );
}
