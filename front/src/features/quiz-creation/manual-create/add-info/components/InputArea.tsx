import { useState } from "react";
import type { Question } from "../../../../../core/models/Questoin";

interface Props{
    width: number;
    height: number;
    backgroundColor: string;
    title: string;
    isTitle?: boolean;
    value?: string;
    setValue?: (item: string) => void
    question?: Question 
}

export default function InputArea ({ width, height, backgroundColor, title, isTitle, value, setValue} : Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={{ 
        width: `${width}%`, 
        display: "flex", 
        flexDirection: "column",
      }}>
        {isTitle &&
        <>
          <div style={{
            display: "flex", 
            flexDirection: "row"
          }}>
            <label style={{
                backgroundColor, 
                width: "auto", 
                display: "inline-block",
                fontSize: 14,
                padding: "5px 15px",
                borderRadius: 8,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
              }}>{title}</label>
        </div>
        </>}
        <input style={{
            height: height,
            border: `5px solid ${backgroundColor}`, 
            backgroundColor: isHover ? "#d4d4d4ff" : "#F8FAFC",
            borderRadius: 8, 
            borderTopLeftRadius: 0, 
            outline: "none", 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }} 
            type="text" 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            value={value}
            onChange={e => setValue && setValue(e.target.value)}
          />
    </div>
  )
}
