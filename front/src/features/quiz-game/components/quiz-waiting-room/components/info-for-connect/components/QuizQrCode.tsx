import { QRCodeSVG } from "qrcode.react";

export default function QuizQrCode() {
  const quizUrl = `http://localhost:5173/quiz/game/${2}`;

  return (
    <div>
      <QRCodeSVG value={quizUrl} size={256} />
    </div>
  );
}
