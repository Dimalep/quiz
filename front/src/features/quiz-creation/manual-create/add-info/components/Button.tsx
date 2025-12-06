import { useState } from "react";
import { useParams } from "react-router-dom";

interface Props{
    backgroundColor: string;
    height: number,
    width: string,
    text: string,
    onDelete?: (id: number) => void;
}

export default function Button({backgroundColor, height, width, text, onDelete} : Props) {
  const [isHover, setIsHover] = useState(false); 
  const {slideId} = useParams<{slideId: string}>();

  return (
    <button style={{
        width,
        height,
        backgroundColor,
        border: "none",
        borderRadius: 8,
        color: "white",
        filter: isHover ? "brightness(1.2)" : "brightness(1)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)"
    }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => onDelete && onDelete(Number(slideId))}
    >{text}</button>
  )
}
