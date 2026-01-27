import Answers from "./components/answers/Answers";
import Media from "./components/media/Media";
import QuestionTitle from "./components/question-title/QuestionTitle";

export default function QuestionSlide() {
  return (
    <div>
      <QuestionTitle />
      <Media />
      <Answers />
    </div>
  );
}
