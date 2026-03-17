import type { Player } from "../../../../../../../core/hooks/quiz-game-microservice/usePlayer";

export interface Props {
  player: Player;
}

export default function PlayerItem({ player }: Props) {
  return <div>{player.nickname}</div>;
}
