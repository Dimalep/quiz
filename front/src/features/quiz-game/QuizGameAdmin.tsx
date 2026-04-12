import QuizGameAdminContext from "./quiz-game-context/QuizGameAdminContext";
import AdminRoom from "./components/admin-room/AdminRoom";

export default function QuizGameAdmin() {
  return (
    <QuizGameAdminContext>
      <AdminRoom />
    </QuizGameAdminContext>
  );
}
