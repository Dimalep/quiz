import type { ProgressForAdmin } from "../../../../../../../../../core/hooks/quiz-game-microservice/useProgress";

interface Props {
  progress: ProgressForAdmin;
}

export default function ResultItem({ progress }: Props) {
  return (
    <tr>
      <td>{progress.player.nickname}</td>
      <td>{progress.quantityCorrectAnswers}</td>
      <td>{progress.status}</td>
    </tr>
  );
}
