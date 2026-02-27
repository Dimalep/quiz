import type {
  Progress,
  ProgressDTO,
} from "../../../../../../../../../core/hooks/quiz-game-microservice/useProgress";

interface Props {
  progress: ProgressDTO;
}

export default function ResultItem({ progress }: Props) {
  return <div>{progress.player.nickname}</div>;
}
