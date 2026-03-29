interface Props {
  text: string;
  color: string;
}

export default function DefaultButton({ color, text }: Props) {
  return <button>{text}</button>;
}
